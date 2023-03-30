function orderManagement ($scope, $http, $rootScope, $filter){
    
    $rootScope.isAdmin = false;

    const userLocal = localStorage.getItem("user");
    const user = userLocal ? JSON.parse(userLocal) : null;
    
    if(user) {
        user.roles.map(item => {
            if(item == "ADMIN"){
                $rootScope.isAdmin = true;            
            } else {
                document.location.href = "#home"
            }
        })
    } else {
        document.location.href = "#home"
    }

    $scope.orderDetail = {
        id: '',
        order: '',
        product: $scope.product,
        productDetail: $scope.productDetail,
        quantity: '',
        price: ''
    }

    $scope.order = {
        id: '',
        code: '',
        codeGHN: '',
        createdDate:"",
        customerName: '',
        phone: '',
        address: '',
        province: '',
        district: '',
        ward: '',
        description: '',
        paymentType: 'OFFLINE',
        voucher: '',
        status: '',
        orderDetails: [angular.copy($scope.orderDetail)],
        orderType: 'OFFLINE',
        totalMoney: 0
    };

    $scope.orders = "";
    $scope.status = "";

    $scope.isLoading = false;
    $scope.isSuccess = true;
    $scope.message = "";
    $scope.pageIndex = 0;
    $scope.totalPage = '';
    $scope.shopInfo = null;

    $scope.province = {};
    $scope.district = {};
    $scope.ward = {};
    $scope.listProvince = [];
    $scope.listDistrict = [];
    $scope.listWard = [];

    $scope.orderStatusReturn = [
        {value: "WAIT_FOR_CONFIRMATION", text: "Chờ xác nhận"}, 
        {value: "CONFIRMED", text: "Đã xác nhận, Đang chuẩn bị hàng"}, 
        {value: "UNCONFIRM", text: "Không được xác nhận"}, 
        {value: "WAIT_FOR_THE_SHIPPER_TO_PICK_UP", text: "Chuẩn bị hàng thành công, Chờ shipper lấy hàng"}, 
        {value: "DELIVERING", text: "Đang giao hàng"}, 
        {value: "NO_DELIVERY", text: "Không giao được hàng"}, 
        {value: "DELIVERED", text: "Đã giao hàng"}, 
        {value: "CANCELLED", text: "Đã hủy"}, 
    ]

    $scope.orderStatus = $scope.orderStatusReturn;

    const apiOrder = 'http://localhost:8080/laclac/order';
    const apiProduct = 'http://localhost:8080/laclac/product';
    const apiShop = 'http://localhost:8080/laclac/shop';
    // const apiGHN = 'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create';

    alertShow = () => {
        $(document).ready(function(){
            $('.toast').toast('show');
        });
    }

    //get all don hang by status
    getAllOrder = (page, status) => {
        $scope.isLoading = true;
        $http.get(apiOrder + "/status" + "?page=" + page + "&status=" + status) 
            .then(function (response) {                    
                $scope.orders = response.data[0];
                $scope.orders.map(order => {
                    var totalMoney = 0;
                    if(order.orderDetails && order.orderDetails.length ){
                        order.orderDetails.forEach(orderDetail => {
                            totalMoney += orderDetail.price * orderDetail.quantity;
                        })
                    }
                    if(order.voucher){
                        totalMoney -= order.voucher.promotion;
                    }
                    order.totalMoney = totalMoney;

                    if(genDayRental(order.updateDate) > 10){
                        order.isReturn = false;
                    } else {
                        order.isReturn = true;
                    }

                    if(order.updateDate == null && genDayRental(order.createdDate) < 10){
                        order.isReturn = true;
                    }
                })
                $scope.totalPage = response.data[1];
                $scope.totalOrder = response.data[2];
                $scope.isLoading = false;
                // console.log($scope.orders);
            })
            .catch(function (error) {
                console.log(error);
                $scope.isSuccess = false;
                $scope.message = "Có lỗi xảy ra, vui lòng thử lại";
                alertShow();
                $scope.isLoading = false;
            });
    }

    const genDayRental = (value) => {
        let d1 = new Date().getTime();
        let d2 = new Date(value).getTime();
        return Math.ceil((d1 - d2) / (24 * 60 * 60 * 1000));
    };

    getAllOrder(0, $scope.status);
    /**get all theo status */
    $scope.getAllBy = () => {
        getAllOrder(0, $scope.status);
    }

    /**get info shop */
    $http.get(apiShop) 
        .then(response => {                    
            $scope.shopInfo = response.data;
        })
        .catch(error => {
            console.log(error);
            $scope.isSuccess = false;
            $scope.message = "Có lỗi xảy ra, vui lòng thử lại";
            alertShow();
        });

    //get all tinh, thanh pho
    $http({
        method: 'GET',
        url: "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province",
        headers: {
            Token: '8572ee07-c663-11ed-ab31-3eeb4194879e',
        }
    })
    .then(function (response) {                    
        $scope.listProvince = response.data.data;
        $scope.isLoading = false;
    })
    .catch(function (error) {
        console.log(error);
        $scope.isLoading = false;
    });

    $scope.prev = () => {
        if($scope.pageIndex <= 0) {
            $scope.pageIndex  = 0;
            getAllOrder(0, $scope.status);
        } else {
            $scope.pageIndex--;
            getAllOrder($scope.pageIndex, $scope.status);
        }
    }

    $scope.next = () => {
        if($scope.pageIndex == $scope.totalPage - 1) {
            $scope.pageIndex = $scope.totalPage - 1;
            getAllOrder($scope.totalPage - 1, $scope.status);
        } else {
            $scope.pageIndex++;
            getAllOrder($scope.pageIndex, $scope.status);
        }
    }

    $scope.deleteOrder = (orderId, index) =>{
        
    }

    /**tim kiem san pham khi cap nhật sản phẩm trong hóa đơn */
    $scope.nameProduct = "";

    getAllProduct = (api) => {
        $scope.isLoading = true;
        $http.get(api)
            .then(function (response) {                    
                $scope.products = response.data;
                $scope.isLoading = false;
            })
            .catch(function (error) {
                console.log(error);
                $scope.isSuccess = false;
                $scope.message = "Có lỗi xảy ra, vui lòng thử lại";
                $scope.isLoading = false;
                alertShow();
            });
    }

    getAllProduct(apiProduct);

     /**tim kiem sp theo ten */
     $scope.searchProduct = () => {
        if($scope.listOrder[orderNo].orderDetails[productIndex].product.name){
            getAllProduct(apiProduct + "/get-by-name?name="+ $scope.listOrder[orderNo].orderDetails[productIndex].product.name);
        } else{
            $scope.productName = "";
            getAllProduct(apiProduct);
        }
    }
    
    /**chon san pham trong danh sach, param: vị tri product, vi tri productDetail, vi tri order hien tai */
    $scope.chooseProduct = (product, productDetail, indexOrder) => {
        var indexProduct = null;
        var result = $scope.orders[indexOrder].orderDetails.filter((item, index) => {
            if(item.id == productDetail.id){
                indexProduct = index;
            }
            return productDetail.id === item.productDetail.id;
        })

        if(result.length == 0){
            $scope.orderDetail.orderId = $scope.orders[indexOrder].id;
            $scope.orderDetail.price = product.price;
            $scope.orderDetail.product = product;
            $scope.orderDetail.productDetail = productDetail;
            $scope.orderDetail.quantity = 1;
            $scope.orders[indexOrder].orderDetails.push(angular.copy($scope.orderDetail));
            
        } else {
            $scope.orders[indexOrder].orderDetails[indexProduct].quantity++;
        }
        // console.log($scope.orders[indexOrder]);
        totalOrder($scope.orders[indexOrder]);
    }

    
    /**tinh tong tien cua don hang */
    totalOrder = (order) => {
        $scope.totalMoney = 0;
        order.orderDetails.map(item => {
            $scope.totalMoney += item.price * item.quantity;            
        });
        if(order.voucher){
            $scope.totalMoney -= order.voucher.promotion;
        }
    }

    /**thay doi so luong san pham */
    $scope.changeQuantity = (indexOrder, index) => {

        const idProductDetail = $scope.orders[indexOrder].orderDetails[index].productDetail.id;
        const quantityProduct = $scope.orders[indexOrder].orderDetails[index].quantity;
        
        $http.get("http://localhost:8080/laclac/product/detail/check-quantity/" + idProductDetail + "?quantity=" + Number(quantityProduct))
            .then(res => {
                if(res.data[1] == false){
                    $scope.showErrQuantity = true;
                    $scope['showErrQuantity' + index] = true;
                } else {
                    $scope['showErrQuantity' + index] = false;
                }
                $scope.quantityInventory = res.data[0];
            }).catch(err => {
                console.log(err);
            })
        totalOrder($scope.orders[indexOrder]);
    }

    /** xoa sp trong don hang */
    $scope.chooseOrderDetail = (indexOrderDetail, indexOrder) => {
        $scope.indexOrderDetail = indexOrderDetail;
        $scope.indexOrder = indexOrder;
    }
    $scope.deleteProduct = () => {
        const productDetailId =  $scope.orders[$scope.indexOrder].orderDetails[$scope.indexOrderDetail].id;

        $http.delete("http://localhost:8080/laclac/order/detail/" + productDetailId)
            .then(response => {
                $scope.isSuccess = true;
                $scope.message = "Đã xóa sản phẩm";
                $scope.orders[$scope.indexOrder].orderDetails.splice($scope.indexOrderDetail, 1);
                alertShow();
            })
            .catch(error => {
                console.log(error);
                $scope.isSuccess = false;
                $scope.message = "Có lỗi xảy ra, vui lòng thử lại";
                $scope.isLoading = false;
                alertShow();
            })
        totalOrder($scope.orders[$scope.indexOrder]);
    }

    // chọn tỉnh thành phố
    $scope.chooseProvince = function(ProvinceID, indexOrder){
        $scope.orders[indexOrder].province = $scope.listProvince.filter(item => {
            return item.ProvinceID == ProvinceID;
        })[0].ProvinceName;
        $scope.orders[indexOrder].district = "";
        $scope.orders[indexOrder].ward = "";

        $scope.province = $scope.listProvince.filter(item => {
            return item.ProvinceID == ProvinceID;
        })[0];  
        
        //lấy các quận huyện theo thành phố
        $http({
            method: 'POST',
            url: "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district",
            headers: {
                Token: '8572ee07-c663-11ed-ab31-3eeb4194879e',
            },
            data: { province_id: ProvinceID },
        })
        .then(function (response) {                    
            $scope.listDistrict = response.data.data;
            if($scope.orders[indexOrder].province == "Hà Nội") {
                $scope.listDistrict.splice(0, 2);
            }
        })
        .catch(function (error) {
            console.log(error);
        });

    }

    // chon quan, huyện
    $scope.chooseDistrict = function(DistrictID, indexOrder){
        $scope.orders[indexOrder].district = $scope.listDistrict.filter(item => {
            return item.DistrictID == DistrictID;
        })[0].DistrictName;

        $scope.district = $scope.listDistrict.filter(item => {
            return item.DistrictID == DistrictID;
        })[0];  

        $scope.orders[indexOrder].ward = "";
        
        //lấy các phường, xã theo thành quận, huyện
        $http({
            method: 'POST',
            url: "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward",
            headers: {
                Token: '8572ee07-c663-11ed-ab31-3eeb4194879e',
            },
            data: { district_id: DistrictID }
        })
        .then(function (response) {                    
            $scope.listWard = response.data.data;
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    //chon phuong, xa
    $scope.chooseWard = function(WardCode, indexOrder){
        $scope.orders[indexOrder].ward = $scope.listWard.filter(item => {
            return item.WardCode == WardCode;
        })[0].WardName;

        $scope.ward = $scope.listWard.filter(item => {
            return item.WardCode == WardCode;
        })[0];  
        // shipFee($scope.orders[indexOrder]);
    }

    /**cập nhật đơn hàng */
    $scope.updateOrder = (indexOrder) => {
        $scope.isLoading = true;
        
        $http.post(apiOrder, $scope.orders[indexOrder])
            .then(async response => {
                $scope.isSuccess = true;
                
                /**nếu trạng thái đơn hàng là chuẩn bị hàng thành công -> đăng đơn lên GHN */
                if(response.data.status == "WAIT_FOR_THE_SHIPPER_TO_PICK_UP" && !response.data.codeGHN){
                    
                    var orderResponse = response.data;
                    var items = [];

                    var weight = 0;
                    var height = 0;
                    var cod_amount = 0; /**tien thu hộ khi thanh toán off */
                    var payment_type_id = 2; /**thu tien nguoi ban(1) or nguoi nhan(2) */

                    response.data.orderDetails.map(item => {
                        var product = {
                            name: item.product.name,
                            code: item.productDetail.id + "",
                            quantity: item.quantity
                        }
                        items.push(angular.copy(product)); /**danh sach cac san pham trong don hang GHN */
                        weight = weight + (item.product.weight.weight * item.quantity);
                        height += item.quantity * 12;
                        if(response.data.paymentType == "OFFLINE"){
                            cod_amount = cod_amount + (item.price * item.quantity); 
                            payment_type_id = 2;
                        } else{
                            payment_type_id = 1;
                        }
                    });
                    
                    var orderGHN = {
                        from_name: $scope.shopInfo.ownerName,
                        from_address: $scope.shopInfo.address,
                        from_province_name: $scope.shopInfo.province,
                        from_district_name: $scope.shopInfo.district,
                        from_ward_name: $scope.shopInfo.ward,
                        from_phone: $scope.shopInfo.tel,
                        to_name: orderResponse.customerName,
                        to_phone: orderResponse.phone,
                        to_address: orderResponse.address,
                        to_ward_name: orderResponse.ward,
                        to_district_name: orderResponse.district,
                        to_province_name: orderResponse.province,
                        // return_name: $scope.shopInfo.ownerName,
                        // return_phone: $scope.shopInfo.tel,
                        // return_address: $scope.shopInfo.address,
                        // return_ward_name: $scope.shopInfo.ward,
                        // return_district_name: $scope.shopInfo.district,
                        // return_province_name: $scope.shopInfo.province,
                        client_order_code: orderResponse.code + "",
                        cod_amount: cod_amount,
                        content: orderResponse.description,
                        weight: weight,
                        length: 33,
                        width: 22,
                        height: height,
                        service_type_id: 2,
                        payment_type_id: payment_type_id,
                        required_note: 'CHOXEMHANGKHONGTHU',
                        items: items
                    };
                    // console.log(orderGHN);

                    $http({
                        method: 'POST',
                        url: "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create",
                        headers: {
                            Token: '8572ee07-c663-11ed-ab31-3eeb4194879e',
                            ShopId: '122249',
                            'Content-Type': 'application/json'
                        },
                        data: orderGHN
                    })
                    .then(responseGHN => {
                        /**cập nhật mã đơn hàng trên ghn vào order trong database */
                        var orderCodeGHN = responseGHN.data.data.order_code;
                        $scope.orders[indexOrder].codeGHN = orderCodeGHN;

                        if($scope.orders[indexOrder].codeGHN){
                            $http.post(apiOrder, $scope.orders[indexOrder])
                                .then(response => {})
                                .catch(error => {
                                    console.log(error);
                                })
                        }
                        $scope.isSuccess = true;
                        $scope.message = "Cập nhật đơn hàng thành công, và đã đăng đơn hàng cho shipper";

                    })
                    .catch(error => {
                        console.log(error);
                        $scope.isSuccess = false;
                        $scope.message = "Cập nhật đơn hàng thành công, Có lỗi xảy ra khi đăng đơn hàng lên GHN";
                    })
                    
                } else{
                    $scope.message = "Cập nhật đơn hàng thành công";
                }

                $scope.isLoading = false;
                getAllOrder(0, $scope.status);
                alertShow();
            })
            .catch(error => {
                console.log(error);
                $scope.isLoading = false;
                $scope.isSuccess = false;
                $scope.message = "Cập nhật đơn hàng thất bại, vui lòng thử lại";
                alertShow();
            });
    }

    /**xử lý hiển thị các trạng thái đơn hàng khi vào cập nhật đơn hàng */
    $scope.showOrder = (indexOrder) => {
        // var status = document.getElementById("order" + indexOrder).value;
        // console.log(status);
        // if(status == "CONFIRMED"){
        //     $scope.orderStatus = $scope.orderStatusReturn.filter(item => {
        //         return item.value === "CONFIRMED" || item.value === "WAIT_FOR_THE_SHIPPER_TO_PICK_UP" || item.value === "CANCELLED";
        //     });
        // } else if(status == "UNCONFIRM"){
        //     $scope.orderStatus = [{value: "UNCONFIRM", text: "Không được xác nhận"}];
        // } else if(status == "WAIT_FOR_THE_SHIPPER_TO_PICK_UP"){
        //     $scope.orderStatus = $scope.orderStatusReturn.filter(item => {
        //         return item.value === "DELIVERING" || item.value === "WAIT_FOR_THE_SHIPPER_TO_PICK_UP";
        //     });
        // } else if(status == "DELIVERING"){
        //     $scope.orderStatus = $scope.orderStatusReturn.filter(item => {
        //         return item.value === "NO_DELIVERY" || item.value === "DELIVERING" || item.value === "DELIVERED";
        //     });
        // } else if(status == "NO_DELIVERY"){
        //     $scope.orderStatus = $scope.orderStatusReturn.filter(item => {
        //         return item.value === "CANCELLED" || item.value === "NO_DELIVERY" || item.value === "WAIT_FOR_THE_SHIPPER_TO_PICK_UP";
        //     });
        // } else if(status == "DELIVERED"){
        //     $scope.orderStatus = [{value: "DELIVERED", text: "Đã giao hàng"}];
        // } else if(status == "CANCELLED"){
        //     $scope.orderStatus = [{value: "CANCELLED", text: "Đã hủy"}];
        // } else {
        //     $scope.orderStatus = $scope.orderStatusReturn;
        // }

        const province = $scope.listProvince.find(item => {
            return item.ProvinceName == $scope.orders[indexOrder].province;
        })

        if(province.ProvinceID){
            $http({
                method: 'POST',
                url: "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district",
                headers: {
                    Token: '8572ee07-c663-11ed-ab31-3eeb4194879e',
                },
                data: { province_id: Number(province.ProvinceID)},
            })
            .then(function (response) {                    
                $scope.listDistrict = response.data.data;
                
                const district = $scope.listDistrict.find(item => {
                    return item.DistrictName == $scope.orders[indexOrder].district;
                }) 
                
                if(district.DistrictID){
                    $http({
                        method: 'POST',
                        url: "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward",
                        headers: {
                            Token: '8572ee07-c663-11ed-ab31-3eeb4194879e',
                        },
                        data: { district_id: Number(district.DistrictID)}
                    })
                    .then(function (response) {                    
                        $scope.listWard = response.data.data;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }

            })
        } 
        
        
        
        totalOrder($scope.orders[indexOrder])

    }

    /**huy update */
    $scope.cancelUpdate = () => {
        $scope.orderStatus = $scope.orderStatusReturn;
        getAllOrder(0, $scope.status);
    }

    // ---------------------------------------------đổi trả hàng-----------------------------------------------
    $scope.orderReturn = null; //hien thi len modal doi tra
    $scope.orderSearchIndex = '';
    $scope.showReturnOrder = (order, indexOrder) => {
        $scope.orderReturn = order;
        // console.log($scope.orderReturn);
        if(order.orderHistories && order.orderHistories[0].status == "WAIT" ){
            $scope.orderReturnHistory = order.orderHistories;
        } else {
            $scope.orderReturnHistory = [];    
        }
        $scope.orderSearchIndex = indexOrder;
        $('#modalReturnOrder').modal('show');
    }

    /**xem lại chỉnh sửa */
    $scope.orderReturnHistory = [];
    /**Số lượng đổi */
    $scope.orderReturnWaitQuantityChange = 1;
    /**Số lượng trả */
    $scope.orderReturnWaitQuantityReturn = 1;
    /**vị trí orderDetail trong order */
    $scope.indexProductInOrderDetail = '';

    /** đổi hàng */
    $scope.changeProductReturn = (indexProduct) => {
        $scope.indexProductInOrderDetail = indexProduct;
    }

    /**đổi 1 phần */
    $scope.changeMultipleProduct = () => {
        const a = angular.copy($scope.orderReturn.orderDetails[$scope.indexProductInOrderDetail]);
        a.quantity = $scope.orderReturnWaitQuantityChange;
        a.action = "DOI";
        a.status = "DONE";
        a.orderDetail = $scope.orderReturn.orderDetails[$scope.indexProductInOrderDetail];
        a.id = "";

        const result = angular.copy($scope.orderReturnHistory).filter((item) => {
            return item.orderDetail.id == a.orderDetail.id && a.action == item.action;
        })

        if(result.length > 0) {
            angular.copy($scope.orderReturnHistory).map((item, index) => {
                if(item.orderDetail.id == a.orderDetail.id && item.action == a.action){
                    $scope.orderReturnHistory[index].quantity += $scope.orderReturnWaitQuantityChange;
                }
            });
        } else {
            $scope.orderReturnHistory.push(a);
        }
    }

    /**đổi tất cả */
    $scope.changeAllProduct = () => {

        const a = angular.copy($scope.orderReturn.orderDetails[$scope.indexProductInOrderDetail]);
        a.action = "DOI";
        a.status = "DONE";
        a.orderDetail = angular.copy($scope.orderReturn.orderDetails[$scope.indexProductInOrderDetail]);
        a.id = "";

        const result = $scope.orderReturnHistory.filter((item) => {
            return item.orderDetail.id == a.orderDetail.id && a.action == item.action;
        })

        if(result.length == 0) {
            $scope.orderReturnHistory.push(angular.copy(a));
        } else {
            $scope.orderReturnHistory.map((item, index) => {
                if(item.orderDetail.id == a.orderDetail.id && a.action == item.action){
                    $scope.orderReturnHistory[index] = $scope.orderReturn.orderDetails[$scope.indexProductInOrderDetail];
                    $scope.orderReturnHistory[index].action = "DOI";
                }
            });
        }
    }

    /**trả hàng */
    $scope.returnProductReturn = (indexProduct) => {
        $scope.indexProductInOrderDetail = indexProduct;
    }

    /**trả 1 phần */
    $scope.returnMultipleProduct = () => {
        
        const a = angular.copy($scope.orderReturn.orderDetails[$scope.indexProductInOrderDetail]);
        a.quantity = $scope.orderReturnWaitQuantityReturn;
        a.action = "TRA";
        a.status = "DONE";
        a.orderDetail = angular.copy($scope.orderReturn.orderDetails[$scope.indexProductInOrderDetail]);
        a.id = "";
        
        const result = angular.copy($scope.orderReturnHistory).filter((item) => {
            return item.orderDetail.id == a.orderDetail.id && item.action == a.action;
        })
        
        $scope.orderReturn.orderDetails[$scope.indexProductInOrderDetail].quantity -= $scope.orderReturnWaitQuantityReturn;
        if(result.length > 0) {
            angular.copy($scope.orderReturnHistory).map((item, index) => {
                if(item.orderDetail.id == a.orderDetail.id && a.action == item.action){
                    $scope.orderReturnHistory[index].quantity += $scope.orderReturnWaitQuantityReturn;
                }
            });
        } else {
            $scope.orderReturnHistory.push(angular.copy(a));
        }

        if($scope.orderReturn.orderDetails[$scope.indexProductInOrderDetail].quantity == 0){
            $scope.orderReturn.orderDetails.splice($scope.indexProductInOrderDetail, 1);
            $scope.orderReturnHistory.map((item, index) => {
                if(item.orderDetail.id == a.orderDetail.id && item.action == "DOI"){
                    $scope.orderReturnHistory.splice(index, 1);
                }
            })
            a.action = "TRA_ALL";
        }
        
    }

    /**trả tất cả */
    $scope.returnAllProduct = () => {

        const a = angular.copy($scope.orderReturn.orderDetails[$scope.indexProductInOrderDetail]);
        a.action = "TRA_ALL";
        a.status = "DONE";
        a.orderDetail = angular.copy($scope.orderReturn.orderDetails[$scope.indexProductInOrderDetail]);
        a.id = "";

        $scope.orderReturnHistory.map((item, index) => {
            if(item.action == "DOI" && item.orderDetail.id == a.orderDetail.id){
                $scope.orderReturnHistory.splice(index, 1);
            }
        })

        const result = $scope.orderReturnHistory.filter((item) => {
            return item.orderDetail.id == a.orderDetail.id;
        })

        if(result.length == 0) {
            $scope.orderReturn.orderDetails.splice($scope.indexProductInOrderDetail, 1);
            $scope.orderReturnHistory.push(angular.copy(a));
        } else {
            $scope.orderReturnHistory.map((item, index) => {
                
                if(item.orderDetail.id == a.orderDetail.id){
                    var quantity = 0; 
                    if(item.action === "TRA" || item.action === "TRA_ALL") {
                        quantity = $scope.orderReturn.orderDetails[$scope.indexProductInOrderDetail].quantity + $scope.orderReturnHistory[index].quantity;
                        $scope.orderReturnHistory[index].quantity = quantity;
                    } else {
                        $scope.orderReturnHistory[index].quantity = a.quantity;
                    }
                    $scope.orderReturnHistory[index] = $scope.orderReturn.orderDetails[$scope.indexProductInOrderDetail];
                    $scope.orderReturn.orderDetails.splice($scope.indexProductInOrderDetail, 1);
                    $scope.orderReturnHistory[index].action = "TRA_ALL";
                }
            });
        }

    }

    /**huy doi, tra hang */
    $scope.cancel = () => {
        $scope.orderReturnHistory = [];
        $scope.orderReturn = $scope.orders[$scope.orderSearchIndex];
        getAllOrder(0, $scope.status);
    }

    /**cập nhật đổi, trả hàng vào database */
    updateOrderReturn = (orderReturn, message, index) => {

        for(var j = 0; j < orderReturn.orderHistories.length; j++){
            const item = orderReturn.orderHistories[j];
            orderReturn.orderHistories[j].status = "DONE";
            var result = false;
            for(var i = 0; i < orderReturn.orderDetails.length; i++){
                if(item.orderDetail.id == orderReturn.orderDetails[i].id ){
                    if(item.action != "DOI"){
                        orderReturn.orderDetails[i].quantity -= item.quantity;
                    }
                    result = true;
                    break;
                } else {
                    result = false;
                }
            }
            if(result == true){
                continue;
            }
        }

        $http.post(apiOrder + "/returnOrder", orderReturn)
            .then(response => {
                $scope.isLoading = false;
                $scope.isSuccess = true;
                $scope.message = message;
                alertShow();
            })
            .catch(error => {
                console.log(error);
                $scope.isLoading = false;
                $scope.isSuccess = false;
                $scope.message = "Có lỗi xảy ra, vui lòng thử lại!!!";
                alertShow();
            })
    }

    $scope.updateReturnOrder = () => {
        $scope.orderReturn.orderHistories = $scope.orderReturnHistory;
        $scope.orderReturn.orderHistories[0].description = $scope.reasonReturn || $scope.orderReturn.orderHistories[0].description;
        $scope.isLoading = true;
        const message = "Đổi trả hàng thành công";
        const index = $scope.orderSearchIndex;
        updateOrderReturn($scope.orderReturn, message, index);
    }

    //xác nhận yêu cầu đổi trả hàng
    $scope.confirmReturnOrder = (order, index) => {
        const message = "Xác nhận đổi trả hàng thành công"
        updateOrderReturn(order, message, index);
    }

    /**không xác nhận yêu cầu đổi trả hàng */
    $scope.unConfirmReturnOrder = (order, index) => {

        order.orderHistories.map(item => {
            item.status = "CANCEL";
        });
        
        $http.post(apiOrder + "/cancelReturnOrder", order)
        .then(response => {
            $scope.isLoading = false;
            $scope.isSuccess = true;
            $scope.message = "Đã hủy đơn hàng";
            alertShow();
            $scope.orders.splice(index, 1);
        })
        .catch(error => {
            console.log(error);
            $scope.isLoading = false;
            $scope.isSuccess = false;
            $scope.message = "Có lỗi xảy ra, vui lòng thử lại!!!";
            alertShow();
        })

    }
    
    /**xóa sản phẩm trong đơn trả hàng: history */
    $scope.chooseProductInReturnOrder = (index, boolean) => {
        $scope.idOrderReturn = $scope.orderReturnHistory[index].id;
        $scope.index = index;
        if(boolean){
            const a = $scope.orderReturnHistory.splice($scope.index, 1);
            if($scope.orderReturn.orderDetails[$scope.indexProductInOrderDetail]){
                $scope.orderReturn.orderDetails[$scope.indexProductInOrderDetail].quantity += a[0].quantity;
            } else {
                $scope.orderReturn.orderDetails[$scope.indexProductInOrderDetail] = a[0];
            }
        }
    }
    $scope.deleteProductInReturnOrder = () => {
        $http.delete("http://localhost:8080/laclac/orderReturn/" + $scope.idOrderReturn)
            .then(respone => {
                $scope.isLoading = false;
                $scope.isSuccess = true;
                $scope.message = "Đã xóa sản phẩm";
                $scope.orderReturnHistory.splice($scope.index, 1);
            })
            .catch(error => {
                console.log(error);
                $scope.isLoading = false;
                $scope.isSuccess = false;
                $scope.message = "Có lỗi xảy ra khi xóa, vui lòng thử lại";
            });
        alertShow();
    }

    //tìm kiếm đơn hàng
    $scope.searchOrder = () => {
        $scope.isLoading = true;
        if($scope.orderCode && $scope.orderCode.length > 1){
            $http.get(apiOrder + "/search?orderCode=" + $scope.orderCode)
                .then(response => {
                    $scope.isLoading = false;
                    // $scope.orderSearch = response.data;
                    $scope.orders = response.data;
                })
                .catch(error => {
                    console.log(error);
                    $scope.isLoading = false;
                    $scope.isSuccess = false;
                    $scope.message = "Có lỗi xảy ra, vui lòng thử lại"
                    alertShow();
                })
        } else {
            // console.log("a");
            getAllOrder(0, '');
        }
    }

    // tìm kiếm theo khoảng thời gian
    findByTime = (beginDate, endDate) => {
        $scope.isLoading = true;
        $http.get(apiOrder + "/findByTime?beginDate=" + beginDate + "&endDate=" + endDate)
            .then(response => {
                $scope.isLoading = false;
                // $scope.orderSearch = response.data;
                $scope.orders = response.data;
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
                $scope.isLoading = false;
                $scope.isSuccess = false;
                $scope.message = "Có lỗi xảy ra, vui lòng thử lại"
                alertShow();
            })
        
    }

    // tìm kiếm theo khoảng thời gian
    $scope.changeBeginDate = () => {
        $scope.beginDatea = $filter('date')($scope.beginDate, 'yyyy-MM-dd');
        if($scope.endDatea){
            findByTime($scope.beginDatea + "", $scope.endDatea + "");
        }
    }

    // tìm kiếm theo khoảng thời gian
    $scope.changeEndDate = () => {
        $scope.endDatea = $filter('date')($scope.endDate, 'yyyy-MM-dd');
        if($scope.beginDatea){
            findByTime($scope.beginDatea, $scope.endDatea);
        }
    }

    $scope.findByTotal = '';
    //tìm kiếm theo khoảng giá tổng tiền đơn hàng
    findBytotal = (beginMoney, endMoney) => {
        $http.get(apiOrder + "/totalMoney?beginMoney=" + beginMoney + "&endMoney=" + endMoney)
            .then(res => {
                $scope.orders = res.data;
                $scope.orders.map(order => {
                    var totalMoney = 0;
                    if(order.orderDetails && order.orderDetails.length ){
                        order.orderDetails.forEach(orderDetail => {
                            totalMoney += orderDetail.price * orderDetail.quantity;
                        })
                    }
                    if(order.voucher){
                        totalMoney -= order.voucher.promotion;
                    }
                    order.totalMoney = totalMoney;
                })
            })
            .catch(err => {
                console.log(err);
                $scope.isSuccess = false;
                $scope.message = "Có lỗi xảy ra khi lọc đơn hàng";
                alertShow();
            })
    }
    $scope.findOrderByTotalMoney = () => {
        if($scope.findByTotal){
            if($scope.findByTotal == 1){
                //tìm các đơn hàng từ 0-> 1tr
                findBytotal(0, 1000000);
            } else if($scope.findByTotal == 2){
                //tìm các đơn hàng từ 1-> 3tr
                findBytotal(1000000, 3000000);
            }else if($scope.findByTotal == 3){
                //tìm các đơn hàng từ 3-> 5tr
                findBytotal(3000000, 5000000);
            }
        } 
        if($scope.findByTotalBegin && $scope.findByTotalEnd){
            findBytotal($scope.findByTotalBegin, $scope.findByTotalEnd);
        }
    }

    $scope.resetOrder = () => {
        $scope.beginDate = null;
        $scope.endDate = null;
        $scope.findByTotalBegin = $scope.findByTotalEnd = '';
        $scope.findByTotal = '';
        getAllOrder(0, "");
    }

    $('select:not(.filter)').each(function () {
        $(this).select2({
            dropdownParent: $(this).parent()
        });
    });

}