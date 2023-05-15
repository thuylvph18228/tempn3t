function productDetailUser($scope, $http, $routeParams, $location) {

    window.scrollTo(0, 0);

    const userLocal = localStorage.getItem("user");
    const user = userLocal ? JSON.parse(userLocal) : null;

    $scope.product = {
        id: $routeParams.productId,
        code: '',
        name: '',
        avatar: '',
        price: '',
        sex: '',
        brand: null,
        category: null,
        origin: null,
        weight: null,
        status: 'AVAILABLE',
        description: '',
        createBy: null,
        updateBy: null,
        createDate: null,
        updateDate: null,
        images: [],
        productDetails: []
    };

    $scope.productDetail = {
        id: '',
        color: null,
        size: null,
        height: null,
    }

    $scope.newProduct = {
        id: $routeParams.productId,
        code: $scope.product.code,
        name: $scope.product.name,
        avatar: $scope.product.avatar,
        price: $scope.product.price,
        brand: null,
        category: null,
        origin: null,
        weight: null,
        status: 'AVAILABLE',
        description: '',
        productDetail: $scope.productDetail
    }

    $scope.orderDetail = {
        id: '',
        order: '',
        product: $scope.newProduct,
        productDetail: $scope.productDetail,
        quantity: 1,
        price: ''
    }

    $scope.orderNew = {
        id: '',
        code: '',
        createdDate: null,
        customerName: '',
        phone: '',
        user: null,
        address: '',
        province: '',
        district: '',
        ward: '',
        description: '',
        paymentType: 'OFFLINE',
        voucher: null,
        orderDetails: [angular.copy($scope.orderDetail)],
        orderType: 'ONLINE_WEB',
        totalMoney: 0
    };

    $scope.address = {
        id: '',
        name: '',
        phone: '',
        province: '',
        ward: '',
        district: '',
        provinceId: '',
        wardCode: '',
        districtId: '',
        defaultAdd: 0,
        user: null,
        address: ''
    }

    $scope.image = {
        id: '',
        productId: '',
        path: ''
    }

    $scope.sizes = [];
    $scope.user = {};
    $scope.colors = [];
    $scope.heights = [];

    $scope.listVoucher = [];
    $scope.listPromotion = [];
    $scope.listAddress = [];
    $scope.listProvince = [];
    $scope.listDistrict = [];
    $scope.listWard = [];
    $scope.shopInfo = null;

    $scope.isLoading = false;
    $scope.isSuccess = true;

    const apiProduct = "http://localhost:8080/n3t/product";
    const apiShop = 'http://localhost:8080/n3t/shop';
    const apiOrder = 'http://localhost:8080/n3t/order';
    const apiUser = 'http://localhost:8080/n3t/user';
    const apiAddress = 'http://localhost:8080/n3t/address';
    const apiPromotion = "http://localhost:8080/n3t/promotion"

    /**hien thi thong bao */
    alertShow = () => {
        $(document).ready(function () {
            $('.toast').toast('show');
        });
    }

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
        if (user) {
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

    $http.get(apiPromotion + "/getAllPromotionByStatusPromotion")
        .then(function (response) {
            $scope.listPromotion = response.data;
            $scope.isLoading = false;
        })
        .catch(function (error) {
            console.log(error);
            $scope.isLoading = false;
        });

    /** lấy tất cả sản phẩm chi tiết theo id sản phẩm */
    $scope.isLoading = true;
    $http.get(apiProduct + "/" + $scope.product.id)
        .then(function (response) {
            $scope.product = response.data;
            $scope.listPromotion.map(itemPromo => {
                itemPromo.promotionCategories.map(itemPromoCate => {
                    if ($scope.product.category.id == itemPromoCate.category.id) {
                        $scope.product.price = $scope.product.price - ($scope.product.price * itemPromo.quantity / 100)
                    }
                })
            })
            $scope.newProduct.code = $scope.product.code;
            $scope.newProduct.name = $scope.product.name;
            $scope.newProduct.avatar = $scope.product.avatar;
            $scope.newProduct.price = $scope.product.price;
            $scope.newProduct.weight = response.data.weight;

            $scope.product.productDetails.forEach(item => {

                /**kiểm tra xem đã có size này chưa, nếu chưa thì thêm vào mảng */
                if ($scope.sizes.length > 0) {
                    var result = $scope.sizes.find(a => {
                        return a.id == item.size.id
                    });
                    if (!result) {
                        $scope.sizes.push(angular.copy(item.size));
                    }
                } else {
                    $scope.sizes.push(angular.copy(item.size));
                }

                /**nếu số lượng sp còn lại = 0, disable */
                item.color.disable = false;
                if (item.quantity == 0) {
                    item.color.disable = true;
                }
                /**kiểm tra xem đã có màu này chưa, nếu chưa thì thêm vào mảng */
                if ($scope.colors.length > 0) {
                    var result = $scope.colors.find(a => a.id == item.color.id);
                    if (!result) {
                        $scope.colors.push(angular.copy(item.color));
                    }
                } else {
                    $scope.colors.push(angular.copy(item.color));
                }

            });

            /**chọn mặc định màu */
            for (var i = 0; i < $scope.colors.length; i++) {
                if ($scope.colors[i].disable == false) {
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
                    if (size.id == item.size.id) {
                        size.disable = false;
                    }
                })
            })

            /**chọn mặc định size */
            for (var i = 0; i < $scope.sizes.length; i++) {
                if ($scope.sizes[i].disable == false) {
                    $scope.newProduct.productDetail.size = $scope.sizes[i];
                    break;
                }
            }

            $scope.newProduct.productDetail = angular.copy($scope.product.productDetails).filter(item => {
                return item.color.id == $scope.newProduct.productDetail.color.id && item.size.id == $scope.newProduct.productDetail.size.id;
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
        if ($scope.newProduct.productDetail.color) {
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
                if (size.id == item.size.id) {
                    size.disable = false;
                }
            })
        });

        $scope.newProduct.productDetail.color = color;
        $scope.newProduct.productDetail.size = null;
    }

    // chọn tỉnh thành phố
    $scope.chooseProvince = function (ProvinceID) {
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
                if ($scope.orderNew.province == "Hà Nội") {
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
    $scope.chooseDistrict = function (DistrictID) {
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
    $scope.chooseWard = function (WardCode) {
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


    /**tinh phí ship */
    $scope.totalShipFee = 0;
    shipFee = (changeQuantity = true) => {
        if ($scope.district && $scope.ward) {

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
            $scope.orderNew.orderDetails.map(item => {
                weightShip += item.quantity * item.product.weight.weight;
                heightShip += item.quantity * 12;
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
                    if ($scope.totalShipFee != 0 && changeQuantity) {
                        $scope.orderNew.totalMoney -= $scope.totalShipFee
                    }
                    $scope.totalShipFee = response.data.data.total;
                    $scope.orderNew.totalMoney += $scope.totalShipFee;
                })
                .catch(error => {
                    console.log(error);
                    $scope.isSuccess = false;
                    $scope.message = "Có lỗi xảy ra khi tính phí ship!!";
                    alertShow();
                })
        }
    }

    /**thay đổi số lượng sp */
    $scope.changeQuantity = (quantity) => {
        if (quantity < 0) {
            $scope.orderNew.orderDetails[0].quantity = 1;
        }

        /**tinh tong tien cua don hang */
        $scope.orderNew.orderDetails.map(item => {
            $scope.orderNew.totalMoney = item.quantity * item.product.price;
        })
        shipFee(false);
    }
    $scope.focusQuantity = (quantity) => {
        if (quantity <= 0 || !quantity) {
            $scope.orderNew.orderDetails[0].quantity = 1;
        }

        /**tinh tong tien cua don hang */
        $scope.orderNew.orderDetails.map(item => {
            $scope.orderNew.totalMoney = item.quantity * item.product.price;
        })
        shipFee(false);
    }

    /**nut mua ngay */
    $scope.buy = () => {
        $scope.orderNew.orderDetails[0].product = $scope.newProduct;
        $scope.orderNew.orderDetails[0].price = $scope.newProduct.price;
        $scope.orderNew.orderDetails[0].productDetail = $scope.productDetail;
        /**tinh tong tien cua don hang */
        $scope.orderNew.orderDetails.map(item => {
            $scope.orderNew.totalMoney = item.quantity * item.product.price;
        })
        shipFee();
        // console.log($scope.orderNew);
    }

    /**tạo đơn hàng mới */
    $scope.createOrder = () => {
        if (localStorage.getItem('user') == 'null') {
            $scope.isSuccess = false;
            $scope.message = "Vui lòng đăng nhập trước khi đặt hàng!"
            alertShow();
            return;
        } else {
            $http.post(apiOrder, $scope.orderNew)
                .then(function (response) {
                    // document.location.href = "#all-order/" + response.data.id;
                    $scope.isLoading = false;
                    $scope.isSuccess = true;
                    $scope.message = "Đặt hàng thành công"
                    alertShow();
                })
                .catch(function (error) {
                    console.log(error);
                    $scope.isLoading = false;
                    $scope.isSuccess = false;
                    $scope.message = "Có lỗi xảy ra, vui lòng thử lại !"
                    alertShow();
                });
        }
    }

    /**thêm sản phẩm vào giỏ hàng */
    $scope.addToCart = () => {
        if (localStorage.getItem('user') == 'null') {
            $scope.isSuccess = false;
            $scope.message = "Vui lòng đăng nhập trước khi đặt hàng!"
            alertShow();
            return;
        } else {
            const productsJson = localStorage.getItem("products");
            const products = productsJson ? JSON.parse(productsJson) : [];

            $scope.newProduct.productDetail = $scope.productDetail;
            const product = $scope.newProduct;
            product.quantity = 1;
            product.selected = true;
            // ------------------------- code thêm vào giỏ hàng phía bên dưới
            if (products.length > 0) {
                //tìm sp trong giỏ hàng, lọc các phần tử trong mảng

                products.forEach((item, index) => {
                    if (item.productDetail.color.id == product.productDetail.color.id && item.productDetail.size.id == product.productDetail.size.id) {
                        products[index].quantity++;
                        const json = JSON.stringify(angular.copy(products));
                        localStorage.setItem("products", json);
                    }
                });
                const result = angular.copy(products).filter(item => {
                    return item.productDetail.color.id == product.productDetail.color.id && item.productDetail.size.id == product.productDetail.size.id;
                });

                if (!result.length) {
                    products.push(angular.copy(product));
                    const json = JSON.stringify(products);
                    localStorage.setItem("products", json);
                }

            } else {
                products.push(angular.copy(product));
                const json = JSON.stringify(angular.copy(products));
                localStorage.setItem("products", json);
            }
            $scope.isSuccess = true;
            $scope.message = "Thêm vào giỏ hàng thành công"
            alertShow();
        }
    }

    $scope.buyNow = () => {
        if (localStorage.getItem('user') == 'null') {
            $scope.isSuccess = false;
            $scope.message = "Vui lòng đăng nhập trước khi đặt hàng!"
            alertShow();
            return;
        } else {
            const productsJson = localStorage.getItem("products");
            const products = productsJson ? JSON.parse(productsJson) : 
            $scope.newProduct.productDetail = $scope.productDetail;
            const product = $scope.newProduct;
            product.quantity = 1;
            product.selected = true;
            // ------------------------- code thêm vào giỏ hàng phía bên dưới
            if (products.length > 0) {
                //tìm sp trong giỏ hàng, lọc các phần tử trong mảng
                products.forEach((item, index) => {
                    if (item.productDetail.color.id == product.productDetail.color.id && item.productDetail.size.id == product.productDetail.size.id) {
                        products[index].quantity++;
                        const json = JSON.stringify(angular.copy(products));
                        localStorage.setItem("products", json);
                    }
                });
                const result = angular.copy(products).filter(item => {
                    return item.productDetail.color.id == product.productDetail.color.id && item.productDetail.size.id == product.productDetail.size.id;
                });
                if (!result.length) {
                    products.push(angular.copy(product));
                    const json = JSON.stringify(products);
                    localStorage.setItem("products", json);
                }
            } else {
                products.push(angular.copy(product));
                const json = JSON.stringify(angular.copy(products));
                localStorage.setItem("products", json);
            }
            $scope.isSuccess = true;
            $location.path('/cart');
        }
    }

    //kiểm tra xem voucher có tồn tại không
    const apiVoucher = 'http://localhost:8080/n3t/voucher';
    $scope.codeVoucher = "";
    $scope.changeVoucher = (code) => {
        // lấy danh sách tất cả các phần tử có lớp CSS "actips"
        var voucherActipsList = document.getElementsByClassName("actips");

        // xoá lớp CSS "actips" khỏi tất cả các phần tử trên danh sách
        for (var i = 0; i < voucherActipsList.length; i++) {
            voucherActipsList[i].classList.remove("actips");
        }

        $scope.codeVoucher = code;
        if ($scope.codeVoucher.length == 9) {
            $http.get(apiVoucher + "/" + $scope.codeVoucher)
                .then(res => {
                    $scope.voucher = res.data;
                    if (!$scope.voucher) {
                        $scope.isSuccess = false;
                        $scope.message = "Voucher không tồn tại hoặc đã hết hạn !!!"
                        alertShow();
                    } else {
                        $scope.orderNew.totalMoney = 0;
                        $scope.orderNew.orderDetails.map(item => {
                            $scope.orderNew.totalMoney += item.quantity * item.product.price
                            $scope.orderNew.totalMoney += $scope.totalShipFee;
                        })
                        if ($scope.orderNew.totalMoney >= $scope.voucher.minMoney) {
                            $scope.orderNew.voucher = $scope.voucher;
                            $scope.orderNew.totalMoney -= $scope.voucher.promotion;
                        }
                        var voucherActips = document.getElementById(code);
                        voucherActips.classList.add("actips");
                        $scope.isSuccess = true;
                        $scope.message = "Đã được sử dụng voucher!!!"
                        alertShow();
                    }
                })
                .catch(err => {
                    console.log(err);
                    $scope.isSuccess = false;
                    $scope.message = "Voucher không tồn tại hoặc đã hết hạn !!!"
                    alertShow();
                })
        } else {
            $scope.orderNew.voucher = null;
            $scope.orderNew.totalMoney = 0;
            $scope.orderNew.orderDetails.map(item => {
                $scope.orderNew.totalMoney += item.quantity * item.product.price
            })
            $scope.orderNew.totalMoney += $scope.totalShipFee;
        }
    }

    /**get voucher by money*/
    $http.get(apiVoucher + "/money/" + $scope.orderNew.totalMoney)
        .then(function (response) {
            $scope.listVoucher = response.data;
            $scope.isLoading = false;
        })
        .catch(function (error) {
            console.log(error);
            $scope.isLoading = false;
        });
    getVoucherByMoney = function () {
        console.log($scope.orderNew.totalMoney);
        $http.get(apiVoucher + "/money/" + $scope.orderNew.totalMoney)
            .then(function (response) {
                $scope.listVoucher = response.data;
                $scope.isLoading = false;
            })
            .catch(function (error) {
                console.log(error);
                $scope.isLoading = false;
            });
    }

    $scope.pay = () => {
        // $scope.vnpayDto.vnp_Amount = $scope.orderNew.totalMoney;
        $http.post(apiOrder + "/pay", $scope.orderNew)
            .then(res => {
                window.location = res.data[0];
            })
            .catch(err => {
                console.log(err);
            })
    }

    const vnp_ResponseCode = $routeParams.vnp_ResponseCode;

    if (vnp_ResponseCode && vnp_ResponseCode == 00) {

        window.location = "http://127.0.0.1:5500/Index.html#/cart";
        $http.get(apiOrder + "/updatePay")
            .then(res => {
                // res.data.orderDetails.forEach(item => {
                //     $scope.products.forEach((element) => {
                //         element.selected = false;
                //         if(item.productDetail.id == element.productDetail.id){
                //             console.log("a");
                //             element.selected = true;
                //         }
                //     });
                // });
                const products = localStorage.getItem("products");
                $scope.products = products ? JSON.parse(products) : [];

                var list = angular.copy($scope.products).filter((item) => {
                    return item.selected != true;
                })

                const json = JSON.stringify(list);
                localStorage.setItem("products", json);
                localStorage.setItem("paySuccess", 1);
                $scope.products = list
                window.location.reload();

            })
            .catch(err => {
                console.log(err);
            })
    } else if (vnp_ResponseCode && vnp_ResponseCode == 51) {
        // window.location = "http://127.0.0.1:5500/Index.html#/cart";
        $scope.message = "Số dư của quý khách không đủ để thực hiện thanh toán, vui lòng thử lại sau!!"
        alertShow();
    } else if (vnp_ResponseCode != null) {
        // window.location = "http://127.0.0.1:5500/Index.html#/cart";
        $scope.message = "Có lỗi xảy ra khi thanh toán đơn hàng, vui lòng thử lại sau!!"
        alertShow();
    }

    const paySuccess = localStorage.getItem("paySuccess");
    if (paySuccess && paySuccess == 1) {
        $scope.message = "Đặt hàng thành công"
        setTimeout(function () {
            $(document).ready(function () {
                $('.toast').toast('show');
            });
            localStorage.removeItem("paySuccess");
        }, 1000);
    }

    $scope.openModal = function () {
        $('#addressModal').modal('show');
    };

    $scope.editAddress = (index) => {
        $('#addressModal').modal('hide');
        $('#confirmModal').modal('show');
        $scope.address = angular.copy($scope.listAddress[index]);
    };

    $scope.closeModalAddress = function () {
        $('#addressModal').modal('hide');
    };

    $scope.closeModalNewAddress = function () {
        $('#confirmModal').modal('hide');
        $('#addressModal').modal('show');
    };

    $scope.newAddress = function () {
        $('#addressModal').modal('hide');
        $('#confirmModal').modal('show');
    };

    $scope.submit = function () {
        $http.post(apiAddress, $scope.address)
            .then(function (response) {
                if (!$scope.address.id) {
                    $scope.listAddress.push(angular.copy(response.data));
                }
                $scope.isLoading = true;
                $scope.isSuccess = true;
                $scope.message = "Lưu địa chỉ thành công"
                $scope.clearAddress();
                $('#confirmModal').modal('hide');
                $('#addressModal').modal('show');
                alertShow();
            })
            .catch(function (error) {
                console.log(error);
                $scope.isLoading = false;
                $scope.isSuccess = false;
                $scope.message = "Có lỗi xảy ra, vui lòng thử lại !"
                alertShow();
            });
    };

    $scope.clearAddress = () => {
        $scope.address = {
            id: '',
            name: '',
            phone: '',
            province: '',
            ward: '',
            district: '',
            provinceId: '',
            wardCode: '',
            districtId: '',
            defaultAdd: 0,
            user: null,
            address: ''
        }
    }

    $scope.deleteAddress = (addressId, index) => {
        $scope.listAddress.splice(index, 1);
        $http.delete(apiAddress + '/' + addressId)
            .then(function (response) {
                $scope.isLoading = true;
                $scope.isSuccess = true;
                $scope.message = "Xoá địa chỉ thành công"
                alertShow();
            })
            .catch(function (error) {
                console.log(error);
                $scope.isLoading = false;
                $scope.isSuccess = false;
                $scope.message = "Có lỗi xảy ra, vui lòng thử lại !"
                alertShow();
            });
    };

    $scope.confirmAddress = ($index) => {
        $scope.listAddress.map(item => {
            if (item.id == $index + 1) {
                $scope.provinceId = item.provinceId;
                $scope.districtId = item.districtId;
                $scope.wardCode = item.wardCode;

                $scope.orderNew.customerName = item.name;
                $scope.orderNew.phone = item.phone;
                $scope.orderNew.province = item.province;
                $scope.orderNew.district = item.district;
                $scope.orderNew.ward = item.ward;
                $scope.orderNew.address = item.address;
            }
        })
        shipFee();
        $('#addressModal').modal('hide');
    }
}