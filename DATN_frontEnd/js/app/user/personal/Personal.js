function personal ($scope, $http){
    
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

    // chọn tỉnh thành phố
    $scope.chooseProvince = function(ProvinceID, indexOrder){
        $scope.listDistrict = [];
        $scope.order.district = '',
        $scope.listWard = [];
        $scope.order.ward = '',

        $scope.province = $scope.listProvince.filter(item => {
            return item.ProvinceID == ProvinceID;
        })[0];  
        $scope.orders[indexOrder].province = $scope.province.ProvinceName;
        getDistrictByProvince(ProvinceID);
    }

    //lấy các quận huyện theo thành phố
    getDistrictByProvince = (ProvinceID) =>{
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
            if($scope.order.province == "Hà Nội"){
                $scope.listDistrict.splice(0, 2);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    // chon quan, huyện
    $scope.chooseDistrict = function(DistrictID, indexOrder){
        $scope.listWard = [];
        $scope.order.ward = '',

        $scope.district = $scope.listDistrict.filter(item => {
            return item.DistrictID == DistrictID;
        })[0];  
        $scope.orders[indexOrder].district = $scope.district.DistrictName;
        getWardByDistrict(DistrictID);
    }

    //lấy các phường, xã theo thành quận, huyện
    getWardByDistrict = (DistrictID) => {
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
        $scope.ward = $scope.listWard.filter(item => {
            return item.WardCode == WardCode;
        })[0];  
        $scope.orders[indexOrder].ward = $scope.ward.WardName;
    }


    $scope.orderDetail = {
        id: '',
        orderId: '',
        product: $scope.product,
        productDetail: $scope.productDetail,
        quantity: '',
        price: ''
    }

    $scope.order = {
        id: '',
        code: '',
        createdDate:"",
        customerName: '',
        phone: '',
        address: '',
        province: '',
        district: '',
        ward: '',
        description: '',
        paymentType: '',
        voucher: '',
        status: '',
        orderDetails: [angular.copy($scope.orderDetail)],
        orderType: '',
        totalMoney: 0
    };

    $scope.orders = [];
    /**lấy username từ localstorage */
    const userLocal = localStorage.getItem("user");
    const user = userLocal ? JSON.parse(userLocal) : null;
    $scope.username = user.username;

    $scope.isLoading = false;
    $scope.isSuccess = true;
    $scope.message = ""
    $scope.pageIndex = 0;
    $scope.totalPage = '';

    const apiOrder = 'http://localhost:8080/laclac/order';
    const apiProduct = 'http://localhost:8080/laclac/product';

    /**hien thi thong bao */
    alertShow = () => {
        $(document).ready(function(){
            $('.toast').toast('show');
        });
    }

    //get all don hang by username
    getAllOrder = ( username) => {
        $scope.isLoading = true;
        $http.get(apiOrder + "/user/" + username) 
            .then(function (response) {      
                $scope.orders = response.data;
                $scope.orders.map(order => {
                    var totalMoney = 0;
                    if(order.orderDetails){
                        order.orderDetails.map(item => {
                            totalMoney += item.quantity * item.price;
                        })
                    }
                    order.totalMoney = totalMoney;
                    order.showEdit = false;
                    if(order.status == "WAIT_FOR_CONFIRMATION" ){ //|| order.status == "CONFIRMED"
                        order.showEdit = true;
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
                })
                $scope.isLoading = false;
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

    getAllOrder($scope.username);

    updateStatusOrder = (order, message, index) => {
        $http.put(apiOrder + "/update-status", order)
        .then( (response) => {
            $scope.orders.splice(index, 1);
            $scope.isLoading = false;
            $scope.isSuccess = true;
            $scope.message = message;
            alertShow();
        })
        .catch((error) => {
            console.log(error);
            $scope.isSuccess = false;
            $scope.isLoading = false;
            $scope.message = "Có lỗi xảy ra, vui lòng thử lại !"
            alertShow();
        })
    }

    $scope.cancel = (order, index) => {
        var message = "Đã hủy đơn hàng";
        order.status = "CANCELLED";
        updateStatusOrder(order, message, index);     
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
        const result = $scope.orders[indexOrder].orderDetails.filter((item, index) => {
            if(item.productDetail.id == productDetail.id){
                indexProduct = index;
            }
            return productDetail.id === item.productDetail.id;
        })
        console.log(indexProduct);

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
        totalOrder($scope.orders[indexOrder]);
    }

    /**tinh tong tien cua don hang */
    $scope.totalMoney = 0;
    totalOrder = (order) => {
        order.totalMoney = 0;
        order.orderDetails.map(item => {
            order.totalMoney += item.price * item.quantity;
        });
        
    }

    /**thay doi so luong san pham */
    $scope.changeQuantity = (indexOrder) => {
        totalOrder($scope.orders[indexOrder]);
        console.log("$scope.totalMoney");
    }

    /** xoa sp trong don hang */
    $scope.chooseDelete = (indexOrderDetail, indexOrder) => {
        $scope.indexOrderDetail = indexOrderDetail;
        $scope.indexOrder = indexOrder;
        if($scope.orders[indexOrder].orderDetails.length == 1){
            $scope.productLast = true;
        }else {
            $scope.productLast = false;
        }
    }
    $scope.deleteProduct = () => {
        if($scope.orders[$scope.indexOrder].orderDetails.length == 1){
            deleteOrder($scope.orders[$scope.indexOrder], $scope.indexOrder);
        } else {
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
    }


    /**cập nhật dơn hàng */
    $scope.updateOrder = (indexOrder) => {
        $scope.isLoading = true;
        $http.post(apiOrder, $scope.orders[indexOrder])
            .then(response => {
                $scope.isLoading = false;
                $scope.isSuccess = true;
                $scope.message = "Cập nhật đơn hàng thành công";
            })
            .catch(error => {
                console.log(error);
                $scope.isLoading = false;
                $scope.isSuccess = false;
                $scope.message = "Cập nhật đơn hàng thất bại";
            });
        alertShow();
    }

    $scope.orderReturn = null; //hien thi len modal doi tra
    $scope.orderIndex = ''; // vị trí order đổi trả
    $scope.returnOrder = (order, indexOrder) => {
        // $scope.orderReturn = order;
        $scope.orderReturn = angular.copy($scope.orders[indexOrder]);
        if($scope.orderReturn.orderHistories){
            $scope.reasonReturn = $scope.orderReturn.orderHistories[0].description;
        }
        // if(order.orderHistories && order.orderHistories[0].status == "WAIT"){
        //     $scope.orderReturnHistory = order.orderHistories;
        // } else {
        //     $scope.orderReturnHistory = [];    
        // }
        $scope.orderIndex = indexOrder;
        var myModal = new bootstrap.Modal(document.getElementById('modalReturnOrder'), {
            keyboard: false
        })
        myModal.show();
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
        a.status = "WAIT";
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
        a.status = "WAIT";
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
        a.status = "WAIT";
        a.orderDetail = angular.copy($scope.orderReturn.orderDetails[$scope.indexProductInOrderDetail]);
        a.id = "";

        const result = angular.copy($scope.orderReturnHistory).filter((item) => {
            return item.orderDetail.id == a.orderDetail.id && item.action == a.action;
        })
        
        // $scope.orderReturn.orderDetails[$scope.indexProductInOrderDetail].quantity -= $scope.orderReturnWaitQuantityReturn;
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
        a.status = "WAIT";
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
        $scope.reasonReturn = '';
        $scope.orderReturn = $scope.orders[$scope.orderIndex];
    }

    /**cập nhật đổi, trả hàng vào database */
    updateOrderReturn = (orderReturn, message) => {
        $http.post(apiOrder + "/returnOrder", orderReturn)
            .then(response => {
                $scope.isLoading = false;
                $scope.isSuccess = true;
                $scope.message = message;
                $scope.orderReturnHistory = [];
                alertShow();
                getAllOrder($scope.username);
            })
            .catch(error => {
                console.log(error);
                $scope.isLoading = false;
                $scope.isSuccess = false;
                $scope.message = "Có lỗi xảy ra, vui lòng thử lại!!!";
                alertShow();
            })
    }

    /**tạo yêu cầu đổi trả hàng */
    $scope.createReturnOrder = () => {
        $scope.orderReturn.orderHistories = $scope.orderReturnHistory;
        $scope.orderReturn.orderHistories[0].description = $scope.reasonReturn;
        $scope.isLoading = true;
        $scope.orderReturnHistory = [];
        const message = "Tạo yêu cầu đổi trả hàng thành công";
        updateOrderReturn($scope.orderReturn, message);
    }

    /**hủy đơn hàng */
    deleteOrder = (order, index) => {
        // order.status = "CANCELLED"
        $scope.isLoading = true;

        $http.delete(apiOrder + "/" + order.id)
            .then(response => {
                $scope.isLoading = false;
                $scope.isSuccess = true;
                $scope.message = "Hủy đơn hàng thành công";
                $scope.orders.splice(index, 1);
            })
            .catch(error => {
                console.log(error);
                $scope.isLoading = false;
                $scope.isSuccess = false;
                $scope.message = "Có lỗi xảy ra khi hủy đơn hàng";
            })
        alertShow();
    }
    $scope.deleteOrder = (order, index) => {
        deleteOrder(order, index);
    }
    

    $scope.personal = {
        id: "",
        fullname: "",
        username: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        province: "",
        district: "",
        ward: "",
        wardCode: "",
        districtId: "",
        provinceId: "",
    }

    const apiUser = 'http://localhost:8080/laclac/user';

    getInfoUser = () => {
        $http.get(apiUser + "/get-by-username?username=" + $scope.username)
            .then(res => {
                $scope.personal = res.data;
                // $scope.personalBackup = angular.copy(res.data);
                
            })
            .catch(err => {
                console.log(err);
            })
    }
    getInfoUser();

    $scope.chooseProvincePersonal = (index) => {
        $scope.listDistrict = [];
        $scope.personal.district = '';
        $scope.listWard = [];
        $scope.personal.ward = '';
        $scope.personal.province = $scope.listProvince[index].ProvinceName;
        $scope.personal.provinceId = $scope.listProvince[index].ProvinceID;
        getDistrictByProvince($scope.personal.provinceId);
    }

    $scope.chooseDistrictPersonal = (index) => {
        $scope.listWard = [];
        $scope.personal.ward = '';
        $scope.personal.district = $scope.listDistrict[index].DistrictName;
        $scope.personal.districtId = $scope.listDistrict[index].DistrictID;
        getWardByDistrict($scope.personal.districtId);
    }
    
    $scope.chooseWardPersonal = (index) => {
        $scope.personal.ward = $scope.listWard[index].WardName;
        $scope.personal.wardCode = $scope.listWard[index].WardCode;
    }

    $scope.updatePersonal = () => {
        $scope.isLoading = true;
        $http.put(apiUser, $scope.personal)
            .then(res => {
                $scope.message = "Cập nhật thông tin thành công";
                $scope.isSuccess = true;
                $scope.isLoading = false;
            })
            .catch(err => {
                $scope.message = "Có lỗi xảy ra, vui lòng thử lại";
                $scope.isSuccess = false;
                $scope.isLoading = false;
            })
        alertShow();
    }

    $scope.cancelUpdatePersonal = () => {
        // $scope.personal = $scope.personalBackup;
        getInfoUser();
    }

    // $scope.$watch($scope.personal, function(newValue, oldValue) {
    //     if(newValue !== oldValue) {
    //         console.log("aaaaaaa");
    //     } 
    // });

}