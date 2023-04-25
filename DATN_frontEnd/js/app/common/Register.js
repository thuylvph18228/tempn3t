function register ($scope, $http) {
    $scope.register = {
        id: '',
        username: '',
        fullname: '',
        password: '',
        phone: '',
        email:'',
        address:'',

    };
    $scope.isSuccess = true;
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

/**lay thong tin user đăng nhập */
getInfoUser = () => {
    $scope.isLoading = true;
    if(user){
        $http.get(apiUser + "/get-by-username?username=" + user.username) 
            .then(response => {    
                $scope.user = response.data;
                localStorage.setItem("idUser", $scope.user.id);
                $scope.address.user = $scope.user;
                $scope.orderNew.user = $scope.user;                
            })
            .catch(error => {
                console.log(error);
                $scope.isSuccess = false;
                $scope.message = "Có lỗi xảy ra, vui lòng thử lại";
                alertShow();
            });
        $scope.isLoading = false;
    }
}
getInfoUser();

/**lay thong tin shop */
getInfoShop = () => {
    $scope.isLoading = true;
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
    $scope.isLoading = false;
}

/** lấy tất cả sản phẩm chi tiết theo id sản phẩm */
$scope.isLoading = true;
$http.get(apiProduct + "/" + $scope.product.id)
    .then(function (response) {    
        $scope.product = response.data;
        // console.log($scope.product);
        $scope.newProduct.code = $scope.product.code;
        $scope.newProduct.name = $scope.product.name;
        $scope.newProduct.avatar = $scope.product.avatar;
        $scope.newProduct.price = response.data.price;
        $scope.newProduct.weight = response.data.weight;
        
        $scope.product.productDetails.forEach(item => {
            
            /**kiểm tra xem đã có size này chưa, nếu chưa thì thêm vào mảng */
            if($scope.sizes.length > 0){
                var result = $scope.sizes.find(a => {
                    return a.id == item.size.id
                });
                if(!result) {
                    $scope.sizes.push(angular.copy(item.size));
                }
            } else {
                $scope.sizes.push(angular.copy(item.size));
            }

            /**nếu số lượng sp còn lại = 0, disable */
            item.color.disable = false;
            if(item.quantity == 0) {
                item.color.disable = true;
            }
            /**kiểm tra xem đã có màu này chưa, nếu chưa thì thêm vào mảng */
            if($scope.colors.length > 0){
                var result = $scope.colors.find(a => a.id == item.color.id);
                if(!result){
                    $scope.colors.push(angular.copy(item.color));
                }
            } else {
                $scope.colors.push(angular.copy(item.color));
            }

        });

        /**chọn mặc định màu */
        for(var i = 0; i < $scope.colors.length; i++){
            if($scope.colors[i].disable == false){
                $scope.newProduct.productDetail.color = $scope.colors[i];
                break;
            }
        }

        $scope.sizes.forEach(item => {
            item.disable = false;
        })
        const result = angular.copy($scope.product.productDetails).filter(item => {
            return item.color.id == $scope.newProduct.productDetail.color.id && item.quantity > 0;
        })
        /** kiếm tra nếu màu không có size này, hoặc hết, disable */
        $scope.sizes.forEach(size => {
            size.disable = true;
            result.map(item => {
                if(size.id == item.size.id) {
                    size.disable = false;
                }
            })
        })

        /**chọn mặc định size */
        for(var i = 0; i < $scope.sizes.length; i++){
            if($scope.sizes[i].disable == false){
                $scope.newProduct.productDetail.size = $scope.sizes[i];
                break;
            }
        }

        $scope.newProduct.productDetail = angular.copy($scope.product.productDetails).filter(item => {
            return item.color.id == $scope.newProduct.productDetail.color.id &&  item.size.id == $scope.newProduct.productDetail.size.id;
        })[0];

        $scope.productDetail = $scope.newProduct.productDetail;

        $scope.isLoading = false;
    })
    .catch(function (error) {
        console.log(error);
        $scope.isLoading = false;
        $scope.isSuccess = false;
        $scope.message = "có lỗi xảy ra, vui lòng thử lại";
        alertShow();
    });

$scope.changeSize = (size) => {
    $scope.newProduct.productDetail.size = size;
    if($scope.newProduct.productDetail.color){
        $scope.productDetail = angular.copy($scope.product.productDetails).filter(item => {
            return $scope.newProduct.productDetail.size.id == item.size.id && $scope.newProduct.productDetail.color.id == item.color.id;
        })[0];
        $scope.newProduct.productDetail = $scope.productDetail;
    }
}

$scope.changeColor = (color) => {
    
    const result = angular.copy($scope.product.productDetails).filter(item => {
        return item.color.id == color.id && item.quantity > 0;
    })
    
    /** kiếm tra nếu màu không có size này, hoặc hết, disable */
    $scope.sizes.map(size => {
        size.disable = true;
        result.forEach(item => {
            if(size.id == item.size.id) {
                size.disable = false;
            }
        })
    });

    $scope.newProduct.productDetail.color = color;
    $scope.newProduct.productDetail.size = null;
}

// chọn tỉnh thành phố
$scope.chooseProvince = function(ProvinceID){
    $scope.listDistrict = [];
    $scope.orderNew.district = '',
    $scope.listWard = [];
    $scope.orderNew.ward = '',

    $scope.province = $scope.listProvince.filter(item => {
        return item.ProvinceID == ProvinceID;
    })[0];  
    $scope.orderNew.province = $scope.province.ProvinceName;
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
        if($scope.orderNew.province == "Hà Nội"){
            $scope.listDistrict.splice(0, 2);
        }
    })
    .catch(function (error) {
        console.log(error);
    });

}

// chọn tỉnh thành phố của địa chỉ
$scope.chooseProvinceAddress = function (ProvinceID) {
    $scope.listDistrict = [];
    $scope.address.district = '',
        $scope.listWard = [];
    $scope.address.ward = '',

        $scope.province = $scope.listProvince.filter(item => {
            return item.ProvinceID == ProvinceID;
        })[0];
    $scope.address.province = $scope.province.ProvinceName;
    $scope.address.provinceId = $scope.province.ProvinceID;
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
            if ($scope.address.province == "Hà Nội") {
                $scope.listDistrict.splice(0, 2);
            }
        })
        .catch(function (error) {
            console.log(error);
        });

}

// chon quan, huyện
$scope.chooseDistrict = function(DistrictID){
    $scope.listWard = [];
    $scope.orderNew.ward = '',

    $scope.district = $scope.listDistrict.filter(item => {
        return item.DistrictID == DistrictID;
    })[0];  
    $scope.orderNew.district = $scope.district.DistrictName;
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

// chon quan, huyện của địa chỉ
$scope.chooseDistrictAddress = function (DistrictID) {
    $scope.listWard = [];
    $scope.address.ward = '',
        $scope.district = $scope.listDistrict.filter(item => {
            return item.DistrictID == DistrictID;
        })[0];
    $scope.address.district = $scope.district.DistrictName;
    $scope.address.districtId = $scope.district.DistrictID;
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
$scope.chooseWard = function(WardCode){
    $scope.ward = $scope.listWard.filter(item => {
        return item.WardCode == WardCode;
    })[0];  
    $scope.orderNew.ward = $scope.ward.WardName;
    shipFee();
}

//chon phuong, xa của địa chỉ
$scope.chooseWardAddress = function (WardCode) {
    $scope.ward = $scope.listWard.filter(item => {
        return item.WardCode == WardCode;
    })[0];
    $scope.address.ward = $scope.ward.WardName;
    $scope.address.wardCode = $scope.ward.WardCode;
}

//get all dia chi theo userid
$http.get(apiAddress + "/get-by-userid/" + localStorage.getItem("idUser"))
    .then(function (response) {
        $scope.listAddress = response.data;
        $scope.listAddress.map(item => {
            if (item.defaultAdd == 1) {                
                $scope.orderNew.customerName = item.name;
                $scope.orderNew.phone = item.phone;
                $scope.orderNew.province = item.province;
                $scope.orderNew.district = item.district;
                $scope.orderNew.ward = item.ward;
                $scope.orderNew.address = item.address;

                $scope.provinceId = item.provinceId;
                $scope.districtId = item.districtId;
                $scope.wardCode = item.wardCode;
            }
        })
        $scope.isLoading = true;
    })
    .catch(function (error) {
        console.log(error);
        $scope.isLoading = false;
    });
}