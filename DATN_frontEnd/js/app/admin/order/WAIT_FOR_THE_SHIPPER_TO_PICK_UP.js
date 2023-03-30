function WAIT_FOR_THE_SHIPPER_TO_PICK_UP ($scope, $http, $rootScope){
    
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
    $scope.status = "WAIT_FOR_THE_SHIPPER_TO_PICK_UP";


    $scope.orderStatus = $scope.orderStatusReturn;

    const apiOrder = 'http://localhost:8080/laclac/order';
    const apiProduct = 'http://localhost:8080/laclac/product';
    const apiShop = 'http://localhost:8080/laclac/shop';

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
                $scope.totalPage = response.data[1];
                $scope.isLoading = false;

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
            .catch(function (error) {
                console.log(error);
                $scope.isSuccess = false;
                $scope.message = "Có lỗi xảy ra, vui lòng thử lại";
                alertShow();
                $scope.isLoading = false;
            });
    }

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
    
    /**chon san pham trong danh sach, param: product, productDetail, vi tri order hien tai */
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
        console.log($scope.orders[indexOrder].orderDetails);
        // console.log(product);
        totalOrder($scope.orders[indexOrder]);
    }

    $scope.totalMoney = 0;
    /**tinh tong tien cua don hang */
    totalOrder = (order) => {
        $scope.totalMoney = 0;
        order.orderDetails.map(item => {
            $scope.totalMoney += item.price * item.quantity;
        });
    }

    /**thay doi so luong san pham */
    $scope.changeQuantity = (indexOrder) => {
        totalOrder($scope.orders[indexOrder]);
    }

    /** xoa sp trong don hang */
    $scope.a = (indexOrderDetail, indexOrder) => {
        $scope.orders[indexOrder].orderDetails.splice(indexOrderDetail, 1);
        totalOrder($scope.orders[indexOrder]);
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
        shipFee($scope.orders[indexOrder]);
    }

    /**cập nhật đơn hàng */
    $scope.updateOrder = (indexOrder) => {
        $scope.isLoading = true;
        // console.log($scope.orders[indexOrder]);
        $http.post(apiOrder, $scope.orders[indexOrder])
            .then(async response => {
                $scope.isSuccess = true;

                /**nếu trạng thái đơn hàng là chuẩn bị hàng thành công -> đăng đơn lên GHN */
                if(response.data.status == "WAIT_FOR_THE_SHIPPER_TO_PICK_UP"){
                    var orderResponse = response.data;
                    var items = [];

                    var weight = 0;
                    var height = 0;
                    var cod_amount = 0; /**tien thu hộ khi thanh toán off */
                    var payment_type_id = 2; /**thu tien nguoi ban(1) or nguoi nhan(2) */

                    
                    $scope.orders[indexOrder].orderDetails.map(item => {
                        var product = {
                            name: item.product.name,
                            code: item.productDetail.id + "",
                            quantity: item.quantity
                        }
                        items.push(angular.copy(product)); /**danh sach cac san pham trong don hang GHN */
                        weight = weight + (item.product.weight.weight * item.quantity);
                        height += 12;
                        if(response.data.paymentType == "OFFLINE"){
                            cod_amount = cod_amount + (item.price * item.quantity); 
                            payment_type_id = 2;
                        } else{
                            payment_type_id = 1;
                        }
                    });
                    
                    var orderGHN = {
                        order_code: response.data.codeGHN,
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
                        url: "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/update",
                        headers: {
                            Token: '8572ee07-c663-11ed-ab31-3eeb4194879e',
                            ShopId: '122249',
                            'Content-Type': 'application/json'
                        },
                        data: orderGHN
                    })
                    .then(responseGHN => {
                        /**cập nhật tiền thu hộ trên ghn */
                        const updateCod = {
                            order_code: response.data.codeGHN,
                            cod_amount: cod_amount
                        }
                        $http({
                            method: 'POST',
                            url: "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/updateCOD",
                            headers: {
                                Token: '8572ee07-c663-11ed-ab31-3eeb4194879e',
                                'Content-Type': 'application/json'
                            },
                            data: updateCod
                        })
                        .then(response => {
                            $scope.isSuccess = true;
                            $scope.message = "Cập nhật đơn hàng thành công";
                        })
                        .catch(error => {
                            console.log(error);
                            $scope.message = "Có lỗi xảy ra khi cập nhật tiền thu hộ trên GHN";
                        })

                    })
                    .catch(error => {
                        console.log(error);
                        $scope.isSuccess = false;
                        $scope.message = "Có lỗi xảy ra khi cập nhật đơn trên GHN";
                    })
                    
                } else{
                    $scope.message = "Cập nhật đơn hàng thành công";
                }

                $scope.isLoading = false;
                alertShow();
            })
            .catch(error => {
                console.log(error);
                $scope.isLoading = false;
                $scope.isSuccess = true;
                $scope.message = "Cập nhật đơn hàng thất bại, vui lòng thử lại";
                alertShow();
            });
    }

    /**huy update */
    $scope.cancelUpdate = () => {
        $scope.orderStatus = $scope.orderStatusReturn;
        console.log($scope.orderStatus);
    }

    /**hủy đơn hàng */
    $scope.cancelOrder = (order, index) => {
        // console.log(order);
        order.status = "CANCELLED"
        $http.post(apiOrder, order)
            .then(async response => {
                const cancelOrder = {
                    order_code: order.codeGHN,
                }
                $http({
                    method: 'POST',
                    url: "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/switch-status/cancel",
                    headers: {
                        Token: '8572ee07-c663-11ed-ab31-3eeb4194879e',
                        'Content-Type': 'application/json'
                    },
                    data: cancelOrder
                })
                .then(response => {
                    $scope.isSuccess = true;
                    $scope.message = "Hủy đơn hàng thành công";
                    $scope.orders.splice(index, 1);
                    alertShow();
                })
                .catch(error => {
                    console.log(error);
                    $scope.message = "Có lỗi xảy ra khi hủy đơn hàng trên GHN";
                    alertShow();
                })
            })
            .catch(error => {
                console.log(error);
                $scope.isSuccess = false;
                $scope.message = "Có lỗi xảy ra khi hủy đơn hàng";
                alertShow();
            })
        
    }

    $scope.chosesOrderUpdate = (index) => {
        totalOrder($scope.orders[index]);
    }

}