function NO_DELIVERY ($scope, $http, $rootScope){
    
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
    $scope.status = "NO_DELIVERY";


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
                $scope.totalPage = response.data[1];
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

    getAllOrder(0, $scope.status);
    /**get all theo status */
    $scope.getAllBy = () => {
        getAllOrder(0, $scope.status);
    }

    /**lay thong tin shop */
    // getInfoShop = () => {
    //     $scope.isLoading = true;
    //     $http.get(apiShop) 
    //         .then(response => {                    
    //             $scope.shopInfo = response.data;
    //         })
    //         .catch(error => {
    //             console.log(error);
    //             $scope.isSuccess = false;
    //             $scope.message = "Có lỗi xảy ra, vui lòng thử lại";
    //             alertShow();
    //         });
    //     $scope.isLoading = false;
    // }

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
            if(item.id = productDetail.id){
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
        console.log($scope.orders[indexOrder]);
        totalOrder($scope.orders[indexOrder]);
    }

    $scope.totalMoney = 0;
    /**tinh tong tien cua don hang */
    totalOrder = (order) => {
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
    }

    /**huy update */
    $scope.cancelUpdate = () => {
        $scope.orderStatus = $scope.orderStatusReturn;
        console.log($scope.orderStatus);
    }

}