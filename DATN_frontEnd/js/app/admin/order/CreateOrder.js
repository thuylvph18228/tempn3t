function createOrder ($scope, $http, $rootScope){

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

    /** sản phẩn của hóa đơn */
    $scope.product = {
        id: '',
        name: '',
        avatar: '',
        price: ''
    };

    $scope.productDetail = {
        id: '',
        size: '',
        color: '',
        height: '',
        material:'',
        product: angular.copy($scope.product)
    };

    $scope.orderDetail = {
        id: '',
        order: '',
        product: $scope.product,
        productDetail: $scope.productDetail,
        quantity: '',
        price: ''
    }

    $scope.orderNew = {
        id: '',
        code: '',
        createdDate: Date.now,
        customerName: '',
        phone: '',
        address: '',
        province: '',
        district: '',
        ward: '',
        description: '',
        paymentType: 'OFFLINE',
        voucher: null,
        orderDetails: [angular.copy($scope.orderDetail)],
        orderType: 'OFFLINE',
        totalMoney: 0
    };

    /**danh sách các hóa đơn*/
    $scope.listOrder = [angular.copy($scope.orderNew)];
    // console.log($scope.listOrder);


    /** vị trí tab đơn hàng đang chọn */
    $scope.index = 0;
    /**Tong so san pham trong hoa don */
    $scope.totalProduct = $scope.listOrder[$scope.index].orderDetails.length;
    $scope.province = {};
    $scope.district = {};
    $scope.ward = {};
    $scope.listProvince = [];
    $scope.listDistrict = [];
    $scope.listWard = [];
    $scope.allProductsDisplay = []; // danh sach hien thi khi tim kiem
    $scope.customers = [];

    $scope.isLoading = false;

    /**hien thi thong bao */
    alertShow = () => {
        $(document).ready(function(){
            $('.toast').toast('show');
        });
    }

    const apiProduct = 'http://localhost:8080/laclac/product';
    const apiOrder = 'http://localhost:8080/laclac/order';
    const apiUser = 'http://localhost:8080/laclac/user'

    $scope.isLoading = true;
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

    /** show tab đơn hàng được chọn */
    $scope.show = function(index) {
        $scope.index = index;
        $scope.totalProduct = $scope.listOrder[$scope.index].orderDetails.length;
    }

    /** xoa đơn hàng đang chờ */
    $scope.deleteOrder = function (index){
        // console.log(index);
        $scope.listOrder.splice(index, 1); // xoa dơn hàng đang chờ tại vị trí
        $scope.show(index - 1); // show tab phía trước
        $scope.index = index - 1;
        $scope.totalProduct = $scope.listOrder[$scope.index].orderDetails.length;
    }

    /** thêm đơn hàng chờ */
    $scope.addOrder = function (){
        $scope.index = $scope.listOrder.length; // gán index = độ dài của danh sách hóa đơn để hiện thị tab đơn hàng vừa thêm

        $scope.orderNew.no = $scope.listOrder.length;
        $scope.listOrder.push(angular.copy($scope.orderNew));
        $scope.totalProduct = $scope.listOrder[$scope.index].orderDetails.length;
        $scope.show($scope.index);
    }

    /** xóa sản phẩm khỏi đơn hàng */
    $scope.deleteProduct = function (orderNo, indexOrderDetail){
        $scope.listOrder[orderNo].orderDetails.splice(indexOrderDetail, 1);
        $scope.totalProduct = $scope.listOrder[$scope.index].orderDetails.length;
        changeQuantityProduct(orderNo);
    }

    /** thêm sản phẩm vào đơn hàng */
    $scope.addProduct = function (orderNo){
        $scope.listOrder[orderNo].orderDetails.push(angular.copy($scope.orderDetail))
        $scope.totalProduct = $scope.listOrder[$scope.index].orderDetails.length;
    }

    // chọn tỉnh thành phố
    $scope.chooseProvince = function(ProvinceID, orderNo){
        $scope.listOrder[orderNo].province = $scope.listProvince.filter(item => {
            return item.ProvinceID == ProvinceID;
        })[0].ProvinceName;
        $scope.listOrder[orderNo].district = "";
        $scope.listOrder[orderNo].ward = "";

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
            if($scope.listOrder[orderNo].province == "Hà Nội") {
                $scope.listDistrict.splice(0, 2);
            }
        })
        .catch(function (error) {
            console.log(error);
        });

    }

    // chon quan, huyện
    $scope.chooseDistrict = function(DistrictID, orderNo){
        $scope.listOrder[orderNo].district = $scope.listDistrict.filter(item => {
            return item.DistrictID == DistrictID;
        })[0].DistrictName;

        $scope.district = $scope.listDistrict.filter(item => {
            return item.DistrictID == DistrictID;
        })[0];

        $scope.listOrder[orderNo].ward = "";

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
    $scope.chooseWard = function(WardCode, orderNo){
        $scope.listOrder[orderNo].ward = $scope.listWard.filter(item => {
            return item.WardCode == WardCode;
        })[0].WardName;

        $scope.ward = $scope.listWard.filter(item => {
            return item.WardCode == WardCode;
        })[0];
        shipFee($scope.listOrder[orderNo]);
    }

    /** get all product */
    getAllProduct = (api) => {
        $scope.isLoading = true;
        $http.get(api)
            .then(function (response) {
                $scope.allProductsDisplay = response.data[0];
                $scope.isLoading = false;
            })
            .catch(function (error) {
                console.log(error);
                $scope.isLoading = false;
            });
    }

    getAllProduct(apiProduct + "/index");
    /**tim kiem sp theo ten */
    $scope.searchProduct = (productIndex, orderNo) => {
        if($scope.listOrder[orderNo].orderDetails[productIndex].product.name){
            getAllProduct(apiProduct + "/get-by-name/"+ $scope.listOrder[orderNo].orderDetails[productIndex].product.name);
        } else{
            $scope.productName = "";
            getAllProduct(apiProduct + "/index");
        }
    }

    /**chon san pham trong danh sach, param: vị tri product, vi tri productDetail, vi tri order hien tai */
    $scope.chooseProduct = (productDetailIndex, productIndex, orderDetailIndex, orderNo) => {
        var orderDetailNew = {
            id: '',
            order: '',
            product: $scope.allProductsDisplay[productIndex],
            productDetail: $scope.allProductsDisplay[productIndex].productDetails[productDetailIndex],
            quantity: 1,
            price: $scope.allProductsDisplay[productIndex].price
        }
        var result = false;
        angular.copy($scope.listOrder[orderNo].orderDetails).forEach(item => {
            if(item.productDetail.id == orderDetailNew.productDetail.id){
                result = true;
            }
        })
        if(result == true){
            angular.copy($scope.listOrder[orderNo].orderDetails).forEach((item, index) => {
                if(item.productDetail.id == orderDetailNew.productDetail.id){
                    $scope.listOrder[orderNo].orderDetails[index].quantity++;
                }
            })
        } else {
            $scope.listOrder[orderNo].orderDetails[orderDetailIndex] = orderDetailNew;
        }

        if($scope.listOrder[orderNo].orderDetails[$scope.listOrder[orderNo].orderDetails.length - 1].productDetail.id){
            $scope.listOrder[orderNo].orderDetails.push(angular.copy($scope.orderDetail));
        }
        changeQuantityProduct(orderNo);

        $scope.totalProduct = $scope.listOrder[$scope.index].orderDetails.length
    }

    //code check quantity
    $scope.changeQuantity =(orderNo, indexProduct) => {
        const idProductDetail = $scope.listOrder[orderNo].orderDetails[indexProduct].productDetail.id;
        const quantityProduct = $scope.listOrder[orderNo].orderDetails[indexProduct].quantity;

        $http.get("http://localhost:8080/laclac/product/detail/check-quantity/" + idProductDetail + "?quantity=" + Number(quantityProduct))
            .then(res => {
                if(res.data[1] == false){
                    $scope.showErrQuantity = true;
                    $scope['showErrQuantity' + indexProduct] = true;
                } else {
                    changeQuantityProduct(orderNo);
                    $scope['showErrQuantity' + indexProduct] = false;
                }
                $scope.quantityInventory = res.data[0];
            }).catch(err => {
                console.log(err);
            })
    }

    /**thay đổi số lượng sản phẩm */
    changeQuantityProduct = (orderNo) => {
        var total = 0;
        $scope.listOrder[orderNo].orderDetails.map(item => {
            total += item.quantity * item.price;
        })
        $scope.listOrder[orderNo].totalMoney = total;
        shipFee($scope.listOrder[orderNo]);
    }

    /**tinh phí ship */
    $scope.totalShipFee = 0;
    shipFee = ( order ) => {

        if($scope.district.DistrictID > 0 && $scope.ward.WardCode.length && order.orderDetails[0].product.id > 0 && order.orderType != "OFFLINE"){
            var ship = {
                service_type_id: 2,
                to_ward_code: $scope.ward.WardCode + "",
                to_district_id: $scope.district.DistrictID,
                weight: 0,
                length: 33,
                width: 22,
                height: 0
            }

            var weightShip = 0;
            var heightShip = 0;
            order.orderDetails.map(item=> {
                if(item.product.id){
                    weightShip += item.quantity * item.product.weight.weight;
                    heightShip += item.quantity * 12;
                }
            })
            ship.weight = weightShip;
            ship.height = heightShip;

            $http({
                method: 'POST',
                url: "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
                headers: {
                    Token: '9e4591da-c66a-11ed-bcba-eac62dba9bd9',
                    ShopId: '3928266',
                    'Content-Type': 'application/json'
                },
                data: ship
            })
            .then(response => {
                console.log(response.data.data);
                $scope.totalShipFee = response.data.data.total;
                order.totalMoney += $scope.totalShipFee;
            })
            .catch(error => {
                console.log(error);
                $scope.isSuccess = false;
                $scope.message = "Có lỗi xảy ra khi tính phí ship!!";
                alertShow();
            })
        }
    }

    /** thêm order vào db */
    $scope.createNewOrder = (orderNo) =>{
        var orderDetailFilter = $scope.listOrder[orderNo].orderDetails.filter( item => {
            return item.product.id > 0;
        });
        $scope.listOrder[orderNo].orderDetails = orderDetailFilter;

        $http.post(apiOrder, $scope.listOrder[orderNo])
            .then(function (response) {
                // $scope.listOrder[orderNo] = $scope.orderNew;
                if(orderNo > 0){
                    $scope.deleteOrder(orderNo);
                } else {
                    $scope.listOrder[orderNo] = $scope.orderNew;
                }
                $scope.totalProduct = 1;
                $scope.isLoading = false;
                $scope.isSuccess = true;
                $scope.message = "Tạo đơn hàng thành công"
                alertShow();
                $scope.totalShipFee = 0;
            })
            .catch(function (error) {
                console.log(error);
                $scope.isLoading = false;
                $scope.isSuccess = false;
                $scope.message = "Có lỗi xảy ra, vui lòng thử lại !"
                alertShow();
            });
    }

    /**show camera */
    $scope.showCamera = () => {
        console.log("camera");
    }

    //tìm kiếm khách hàng theo tên
    searchCustomerByFullnameOrPhone = (info) => {
        if(info){
            $scope.isLoading = true;
            $http.get(apiUser + "/find-by-fullname-or-phone/" + info)
            .then(res => {
                $scope.customers = res.data;
                $scope.isLoading = false;
            })
            .catch(err => {
                console.log(err);
                $scope.isLoading = false;
            });
        } else {
            console.log("a");
            $scope.customers = [];
        }
    }

    $scope.searchCustomer = (customer) => {
        if(customer && customer.length > 1){
            searchCustomerByFullnameOrPhone(customer);
        }
    }

    $scope.chooseCustomer = (indexCustomer, indexOrder ) => {
        $scope.listOrder[indexOrder].customerName = $scope.customers[indexCustomer].fullname;
        $scope.listOrder[indexOrder].phone = $scope.customers[indexCustomer].phone;
        $scope.listOrder[indexOrder].province = $scope.customers[indexCustomer].province;
        $scope.listOrder[indexOrder].district = $scope.customers[indexCustomer].district;
        $scope.listOrder[indexOrder].ward = $scope.customers[indexCustomer].ward;
        $scope.listOrder[indexOrder].address = $scope.customers[indexCustomer].address;

        $scope.district.DistrictID = Number($scope.customers[indexCustomer].districtId);
        $scope.ward.WardCode = $scope.customers[indexCustomer].wardCode;
        shipFee($scope.listOrder[indexOrder]);

    }

};
