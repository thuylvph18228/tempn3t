function orderWaitConfirm ($scope, $http, $rootScope){
    
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
    $scope.status = "WAIT_FOR_CONFIRMATION";

    $scope.isLoading = false;
    $scope.isSuccess = true;
    $scope.message = ""
    $scope.pageIndex = 0;
    $scope.totalPage = '';

    $scope.province = {};
    $scope.district = {};
    $scope.ward = {};
    $scope.listProvince = [];
    $scope.listDistrict = [];
    $scope.listWard = [];

    const apiOrder = 'http://localhost:8080/laclac/order';
    const apiProduct = 'http://localhost:8080/laclac/product';

    /**hien thi thong bao */
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

    /**cập nhật trạng thái đơn hàng */
    updateStatus = (order, message, index) => {
        $http.put(apiOrder + "/update-status", order)
        .then( (response) => {
            $scope.orders.splice(index, 1);
            // console.log(response.data);
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

    /**Không xác nhận đơn hàng */
    $scope.unConfirmOrder = (order, index) => {
        var message = "Đã hủy đơn hàng"
        order.status = "UNCONFIRM";
        updateStatus(order, message, index);     
    }

    /**Xác nhận đơn hàng */
    $scope.confirmOrder = (order, index) => {
        var message = "Xác nhận đơn hàng thành công"
        order.status = "CONFIRMED";
        updateStatus(order, message, index);     
    }

    /**tim kiem san pham khi cap nhật sản phẩm trong hóa đơn */
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

    $scope.showAllProduct = () => {
        getAllProduct(apiProduct);
    }

     /**tim kiem sp theo ten */
     $scope.nameProduct = '';
     $scope.searchProduct = () => {
         console.log($scope.nameProduct);
         if($scope.nameProduct){
            getAllProduct(apiProduct + "/get-by-name?name="+ $scope.nameProduct);
        } else{
            $scope.nameProduct = "";
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
        // console.log(product);
        // console.log(productDetail);
        console.log(result);
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

    /**Cập nhật sản phẩm trong đơn hàng */
    $scope.updateOrder = (indexOrder) => {
        $scope.isLoading = true;
        console.log($scope.orders[indexOrder]);
        $http.post(apiOrder, $scope.orders[indexOrder])
            .then(response => {
                $scope.isLoading = false;
                $scope.isSuccess = true;
                $scope.message = "Cập nhật đơn hàng thành công";
                alertShow();
            })
            .catch(error => {
                console.log(error);
                $scope.isLoading = false;
                $scope.isSuccess = true;
                $scope.message = "Cập nhật đơn hàng thành công";
                alertShow();
            });
    }

    $scope.chosesOrderUpdate = (index) => {
        totalOrder($scope.orders[index]);
    }
    
}