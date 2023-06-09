function cart($scope, $http, $routeParams) {


    /**lấy tất cả sản phẩm trong giỏ hàng */
    // $scope.products = [];
    const products = localStorage.getItem("products");
    $scope.products = products ? JSON.parse(products) : [];

    const userLocal = localStorage.getItem("user");
    const user = userLocal ? JSON.parse(userLocal) : null;

    $scope.initialized = false;
    $scope.hasSelectedProduct = false;

    $scope.product = {
        id: "",
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
        productDetails: null,
        selected: true,
    };

    $scope.productDetail = {
        id: '',
        color: null,
        size: null,
        height: null,
    }

    $scope.orderDetail = {
        id: '',
        order: '',
        product: $scope.product,
        productDetail: $scope.productDetail,
        quantity: 1,
        price: ''
    }

    $scope.orderDetails = [];
    var totalMoney = 0;
    $scope.products.map(item => {
        item.selected = true;
        $scope.orderDetail = {
            id: '',
            order: '',
            product: item,
            productDetail: item.productDetail,
            quantity: item.quantity,
            price: item.price
        }
        $scope.orderDetails.push(angular.copy($scope.orderDetail));
        totalMoney += item.quantity * item.price;
        if (totalMoney != 0) {
            $scope.hasSelectedProduct = $scope.products.some((product) => product.selected);
        }
    })

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
        orderDetails: angular.copy($scope.orderDetails),
        orderType: 'ONLINE_WEB',
        totalMoney: totalMoney,
        isPay: '',
        totalShip: 0
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

    $scope.voucherCode = '';
    $scope.user = {};
    $scope.sizes = [];
    $scope.colors = [];
    $scope.heights = [];

    $scope.listVoucher = [];
    $scope.listAddress = [];
    $scope.listVoucherIf = [];
    $scope.listProvince = [];
    $scope.listDistrict = [];
    $scope.listWard = [];
    $scope.shopInfo = null;

    $scope.isLoading = false;
    $scope.isSuccess = true;

    $scope.userId = null;
    $scope.provinceId = null;
    $scope.districtId = null;
    $scope.wardCode = null;
    $scope.index = -1;

    const apiShop = 'http://localhost:8080/n3t/shop';
    const apiOrder = 'http://localhost:8080/n3t/order';
    const apiUser = 'http://localhost:8080/n3t/user';
    const apiAddress = 'http://localhost:8080/n3t/address';

    /**hien thi thong bao */
    alertShow = () => {
        $(document).ready(function () {
            $('.toast').toast('show');
        });
    }

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

                    if ($scope.provinceId) {
                        $http({
                            method: 'POST',
                            url: "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district",
                            headers: {
                                Token: '8572ee07-c663-11ed-ab31-3eeb4194879e',
                            },
                            data: { province_id: Number($scope.provinceId) },
                        })
                            .then(function (response) {
                                $scope.listDistrict = response.data.data;
                                if ($scope.orderNew.province == "Hà Nội") {
                                    $scope.listDistrict.splice(0, 2);
                                }
                            })
                    }
                    if ($scope.districtId) {
                        $http({
                            method: 'POST',
                            url: "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward",
                            headers: {
                                Token: '8572ee07-c663-11ed-ab31-3eeb4194879e',
                            },
                            data: { district_id: Number($scope.districtId) }
                        })
                            .then(function (response) {
                                $scope.listWard = response.data.data;
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }

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
        $scope.districtId = $scope.district.DistrictID;
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
        $scope.wardCode = $scope.ward.WardCode;
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
            // if ($scope.products.length>0) {
            shipFee();
            // }
            $scope.isLoading = true;
        })
        .catch(function (error) {
            console.log(error);
            $scope.isLoading = false;
        });

    /**tinh phí ship */
    $scope.totalShipFee = 0;
    shipFee = (changeQuantity = true) => {
        if ($scope.products.length > 0) {
            if ($scope.wardCode && $scope.districtId) {
                const selectedProducts = $scope.products.filter(product => {
                    return product.selected && (!product.quantity || product.quantity <= product.quantityInventory) && product.weight && typeof product.weight.weight === 'number';
                });
                if (selectedProducts.length > 0) {
                    ship = {
                        service_type_id: 2,
                        to_ward_code: $scope.wardCode + "",
                        to_district_id: Number($scope.districtId),
                        weight: 0,
                        length: 33,
                        width: 22,
                        height: 0
                    }
    
                    var weightShip = 0;
                    var heightShip = 0;
                    selectedProducts.forEach(item => {
                        weightShip += item.quantity * item.weight.weight;
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
                            $scope.totalShipFee = response.data.data.total;
                            $scope.orderNew.totalShip = response.data.data.total;
                            $scope.orderNew.totalMoney += $scope.totalShipFee;
                        })
                        .catch(error => {
                            console.log(error);
                        })
                } else {
                    $scope.totalShipFee = 0; // Không có sản phẩm hợp lệ được chọn, phí ship = 0
                    $scope.orderNew.totalShip = 0;
                    $scope.orderNew.totalMoney -= $scope.totalShipFee;
                }
            }
        }
    }

    /**thay đổi số lượng sp trong đơn hàng */
    $scope.changeQuantityOrder = () => {
        /**tinh tong tien cua don hang */
        $scope.orderNew.totalMoney = 0;
        $scope.orderNew.orderDetails.map(item => {
            $scope.orderNew.totalMoney += item.quantity * item.product.price;
        })
        shipFee(false);
    }

    /**nut thanh toán */
    $scope.buy = () => {
        shipFee();
    }

    /**tạo đơn hàng mới */
    $scope.createOrder = () => {
        $http.post(apiOrder, $scope.orderNew)
            .then(function (response) {
                $scope.isLoading = false;
                $scope.isSuccess = true;
                $scope.message = "Đặt hàng thành công"
                alertShow();

                /**xóa các sp đã mua trong giỏ hàng */
                var list = angular.copy($scope.products).filter((item) => {
                    return item.selected == false;
                })
                $scope.products = list;
                const json = JSON.stringify(list);
                localStorage.setItem("products", json);
                updateOrder();
            })
            .catch(function (error) {
                console.log(error);
                $scope.isLoading = false;
                $scope.isSuccess = false;
                $scope.message = "Có lỗi xảy ra, vui lòng thử lại !"
                alertShow();
            });
    }

    /**thay đổi số lượng trong giỏ hàng, index: vị trí sản phẩm trong mảng products */
    $scope.changeQuantity = (indexOrder, index) => {
        if (!$scope.products[index] || !$scope.products[index].quantity) {
            $scope.error = true;
            return; // Thoát khỏi hàm nếu phần tử không tồn tại hoặc không có thuộc tính 'quantity'
        }
        const json = JSON.stringify(angular.copy($scope.products));
        localStorage.setItem("products", json);

        const idProductDetail = $scope.products[index].productDetail.id;
        const quantityProduct = $scope.products[index].quantity;

        $http.get("http://localhost:8080/n3t/product/detail/check-quantity/" + idProductDetail + "?quantity=" + Number(quantityProduct))
            .then(res => {
                if (res.data[1] == false) {
                    $scope.showErrQuantity = true;
                    $scope.products[index].selected = false;
                    $scope.hasSelectedProduct = $scope.products.some((product) => product.selected);
                    $scope['showErrQuantity' + index] = true;
                    updateOrder();
                    $scope.error = true;
                } else {
                    $scope['showErrQuantity' + index] = false;
                    $scope.products[index].selected = true;
                    $scope.hasSelectedProduct = $scope.products.some((product) => product.selected);
                    updateOrder();
                    $scope.error = false;
                }
                $scope.products[index].quantityInventory = res.data[0];
                $scope.products[index].selected = !($scope.products[index].quantity > $scope.products[index].quantityInventory);
            }).catch(err => {
                console.log(err);
            })
    }
    
    // Kiểm tra xem có sản phẩm trong giỏ hàng hay không
    if ($scope.products.length > 0) {
        // Lặp qua từng sản phẩm trong giỏ hàng và gọi hàm changeQuantity
        for (let i = 0; i < $scope.products.length; i++) {
            $scope.changeQuantity(i, i); // Truyền cùng chỉ số cho cả indexOrder và index
        }        
    }


    /**xóa sản phẩm trong giỏ hàng, index: vị trí sản phẩm trong giỏ hàng*/
    $scope.delete = (index) => {
        $scope.products.splice(index, 1);

        const json = JSON.stringify(angular.copy($scope.products));
        localStorage.setItem("products", json);
        updateOrder();
    }

    /**update đơn hàng */
    updateOrder = () => {
        $scope.orderDetails = [];
        var totalMoney = 0;
        $scope.products.forEach(item => {
            if (item.selected) {
                $scope.orderDetail = {
                    id: '',
                    order: '',
                    product: item,
                    productDetail: item.productDetail,
                    quantity: item.quantity,
                    price: item.price
                }
                $scope.orderDetails.push(angular.copy($scope.orderDetail));
                totalMoney += item.quantity * item.price;
            }
        })
        $scope.orderNew.orderDetails = $scope.orderDetails;
        $scope.orderNew.totalMoney = totalMoney;
        shipFee();
        getVoucherByMoney();
    }

    $scope.check = (index) => {
        $scope.products[index].selected = !$scope.products[index].selected;

        const json = JSON.stringify($scope.products);
        localStorage.setItem("products", json);
        updateOrder();
        // Kiểm tra xem có sản phẩm nào được chọn hay không
        $scope.hasSelectedProduct = $scope.products.some((product) => product.selected);
    }

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
                        })
                        $scope.orderNew.totalMoney += $scope.totalShipFee;
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
        $scope.message = "Số dư của quý khách không đủ để thực hiện thanh toán, vui lòng thử lại sau!!"
        alertShow();
    } else if (vnp_ResponseCode != null) {
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
        $scope.index = index;
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
        $(document).ready(function () {
            $('body').on('click', '.checkmobile', function () {
                var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
                var mobile = $('#phone').val();
                if (mobile !== '') {
                    if (vnf_regex.test(mobile) == false) {
                        $scope.isLoading = false;
                        $scope.isSuccess = false;
                        $scope.message = 'Số điện thoại của bạn không đúng định dạng!';
                        alertShow();
                        return;
                    } else {
                        $http.post(apiAddress, $scope.address)
                            .then(function (response) {
                                if ($scope.index > -1) {
                                    $scope.listAddress[$scope.index] = response.data;
                                    if (response.data.defaultAdd == 1) {
                                        $scope.listAddress.find(item => {
                                            if (response.data.id != item.id) {
                                                item.defaultAdd = 0
                                            }
                                        })
                                    }
                                } else {
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
                } else {
                    $scope.isLoading = false;
                    $scope.isSuccess = false;
                    $scope.message = 'Bạn chưa điền số điện thoại!';
                    alertShow();
                    return;
                }
            });
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
    }

    $scope.confirmAddress = (index) => {
        $scope.address = angular.copy($scope.listAddress[index]);
        $scope.listAddress.map(item => {
            if (item.id == $scope.address.id) {
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