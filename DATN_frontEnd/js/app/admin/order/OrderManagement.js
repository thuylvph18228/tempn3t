function orderManagement($scope, $http, $rootScope, $filter, $timeout) {

    $rootScope.isAdmin = false;

    const userLocal = localStorage.getItem("user");
    const user = userLocal ? JSON.parse(userLocal) : null;

    if (user) {
        user.roles.map(item => {
            if (item == "ADMIN") {
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
        createdDate: "",
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
    $scope.orderwaitconfirms = "";
    $scope.orderconfirmeds = "";
    $scope.orderwaitshippers = "";
    $scope.orderDelivering = "";
    $scope.orderDelivered = "";
    $scope.orderNoDelivery = "";
    $scope.orderCanceled = "";
    $scope.orderRe = "";
    $scope.status = "";
    $scope.statusReturn = "WAIT";

    $scope.isLoading = false;
    $scope.isSuccess = true;
    $scope.message = "";
    $scope.pageIndex = 0;
    $scope.totalPage = '';
    $scope.shopInfo = null;
    $scope.active = false;

    $scope.province = {};
    $scope.district = {};
    $scope.ward = {};
    $scope.listProvince = [];
    $scope.listDistrict = [];
    $scope.listWard = [];

    $scope.orderStatusReturn = [
        { value: "WAIT_FOR_CONFIRMATION", text: "Chờ xác nhận" },
        { value: "CONFIRMED", text: "Đã xác nhận, Đang chuẩn bị hàng" },
        { value: "UNCONFIRM", text: "Không được xác nhận" },
        { value: "WAIT_FOR_THE_SHIPPER_TO_PICK_UP", text: "Chuẩn bị hàng thành công, Chờ shipper lấy hàng" },
        { value: "DELIVERING", text: "Đang giao hàng" },
        { value: "NO_DELIVERY", text: "Không giao được hàng" },
        { value: "DELIVERED", text: "Đã giao hàng" },
        { value: "CANCELLED", text: "Đã hủy" },
    ]

    $scope.orderStatus = $scope.orderStatusReturn;

    const apiOrder = 'http://localhost:8080/n3t/order';
    const apiProduct = 'http://localhost:8080/n3t/product';
    const apiShop = 'http://localhost:8080/n3t/shop';
    // const apiGHN = 'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create';

    alertShow = () => {
        $(document).ready(function () {
            $('.toast').toast('show');
        });
    }

    // start don hang by status waitconfirm
    {
        getAllOrderWaitConfirm = (page, status) => {
            $scope.isLoading = true;
            $http.get(apiOrder + "/status" + "?page=" + page + "&status=" + status)
                .then(function (response) {
                    $scope.orderwaitconfirms = response.data[0];
                    $scope.totalPage = response.data[1];
                    $scope.isLoading = false;
                    $scope.countWaitConfirm = response.data[1];
                    $scope.orderwaitconfirms.map(order => {
                        var totalMoney = 0;
                        if (order.orderDetails && order.orderDetails.length) {
                            order.orderDetails.forEach(orderDetail => {
                                totalMoney += orderDetail.price * orderDetail.quantity;
                            })
                        }
                        if (order.voucher) {
                            totalMoney -= order.voucher.promotion;
                        }
                        order.totalMoney = totalMoney + order.totalShip;
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
        getAllOrderWaitConfirm(0, $scope.status = "WAIT_FOR_CONFIRMATION");

        $scope.pageIndexWaitConfirm = 0;
        $scope.prevWaitConfirm = () => {
            if ($scope.pageIndexWaitConfirm <= 0) {
                $scope.pageIndexWaitConfirm = 0;
                getAllOrderWaitConfirm(0, $scope.status = "WAIT_FOR_CONFIRMATION");
            } else {
                $scope.pageIndexWaitConfirm--;
                getAllOrderWaitConfirm($scope.pageIndexWaitConfirm, $scope.status = "WAIT_FOR_CONFIRMATION");
            }
        }

        $scope.nextWaitConfirm = () => {
            if ($scope.pageIndexWaitConfirm == $scope.totalPage - 1) {
                $scope.pageIndexWaitConfirm = $scope.totalPage - 1;
                getAllOrderWaitConfirm($scope.totalPage - 1, $scope.status = "WAIT_FOR_CONFIRMATION");
            } else {
                $scope.pageIndexWaitConfirm++;
                getAllOrderWaitConfirm($scope.pageIndexWaitConfirm, $scope.status = "WAIT_FOR_CONFIRMATION");
            }
        }

        /**cập nhật trạng thái đơn hàng */
        updateStatus = (order, message, index) => {
            $http.put(apiOrder + "/update-status", order)
                .then((response) => {
                    $scope.orderwaitconfirms.splice(index, 1);
                    $scope.isLoading = true;
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
            $http.get(apiProduct)
                .then(function (response) {
                    $scope.isLoading = true;
                    let found = false;
                    order.orderDetails.forEach(orderDetail => {
                        response.data.forEach(product => {
                            product.productDetails.forEach(detail => {
                                if (orderDetail.productDetail.id == detail.id) {
                                    if (orderDetail.quantity > detail.quantity) {
                                        $scope.isSuccess = false;
                                        $scope.message = "Số lượng trong kho không đủ với đơn này!";
                                        found = true;
                                        alertShow();
                                    }
                                }
                            })
                        })
                    })
                    if (!found) {
                        var message = "Xác nhận đơn hàng thành công"
                        order.status = "CONFIRMED";
                        updateStatus(order, message, index);
                        $scope.orderconfirmeds.unshift(angular.copy(order));
                        // Lấy tab đang xử lý (confirmed)
                        var tabConfirmed = document.getElementById("confirmed-tab");
                        // Kích hoạt sự kiện click vào tab đó
                        tabConfirmed.click();
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    $scope.isSuccess = false;
                    $scope.message = "Có lỗi xảy ra, vui lòng thử lại";
                    $scope.isLoading = false;
                    alertShow();
                });
        }

        $scope.showAllProductWaitConfirm = () => {
            getAllProduct(apiProduct);
        }

        /**tim kiem sp theo ten */
        $scope.nameProduct = '';
        $scope.searchProducWaitConfirm = () => {
            console.log($scope.nameProduct);
            if ($scope.nameProduct) {
                getAllProduct(apiProduct + "/get-by-name?name=" + $scope.nameProduct);
            } else {
                $scope.nameProduct = "";
                getAllProduct(apiProduct);
            }
        }

        /**chon san pham trong danh sach, param: vị tri product, vi tri productDetail, vi tri order hien tai */
        $scope.chooseProductWaitConfirm = (product, productDetail, indexOrder) => {
            var indexProduct = null;
            var result = $scope.orderwaitconfirms[indexOrder].orderDetails.filter((item, index) => {
                if (item.id == productDetail.id) {
                    indexProduct = index;
                }
                return productDetail.id === item.productDetail.id;
            })
            if (result.length == 0) {
                $scope.orderDetail.orderId = $scope.orderwaitconfirms[indexOrder].id;
                $scope.orderDetail.price = product.price;
                $scope.orderDetail.product = product;
                $scope.orderDetail.productDetail = productDetail;
                $scope.orderDetail.quantity = 1;
                $scope.orderwaitconfirms[indexOrder].orderDetails.push(angular.copy($scope.orderDetail));

            } else {
                // console.log($scope.orderwaitconfirms[indexOrder].orderDetails);
                $scope.orderwaitconfirms[indexOrder].orderDetails[indexProduct].quantity++;
            }
            totalOrderWaitConfirm($scope.orderwaitconfirms[indexOrder]);
        }

        $scope.totalMoney = 0;
        /**tinh tong tien cua don hang */
        totalOrderWaitConfirm = (order) => {
            totalMoney = 0;
            order.orderDetails.map(item => {
                totalMoney += item.price * item.quantity;
                if (order.voucher) {
                    totalMoney -= order.voucher.promotion;
                }
                order.totalMoney = totalMoney + order.totalShip;
            });
        }

        /**thay doi so luong san pham */
        $scope.changeQuantityWaitConfirm = (indexOrder) => {
            totalOrderWaitConfirm($scope.orderwaitconfirms[indexOrder]);
        }

        /** xoa sp trong don hang */
        $scope.a = (indexOrderDetail, indexOrder) => {
            $scope.orderwaitconfirms[indexOrder].orderDetails.splice(indexOrderDetail, 1);
            totalOrderWaitConfirm($scope.orderwaitconfirms[indexOrder]);
        }

        /**Cập nhật sản phẩm trong đơn hàng */
        $scope.updateOrderWaitConfirm = (indexOrder) => {
            $scope.isLoading = true;
            console.log($scope.orderwaitconfirms[indexOrder]);
            $http.post(apiOrder, $scope.orderwaitconfirms[indexOrder])
                .then(response => {
                    $scope.isLoading = true;
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

        $scope.chosesOrderUpdateWaitConfirm = (index) => {
            totalOrder($scope.orderwaitconfirms[index]);
        }

        //tìm kiếm đơn hàng
        $scope.searchOrderWaitConfirm = () => {
            $scope.isLoading = true;
            if ($scope.orderCode && $scope.orderCode.length > 1) {
                $http.get(apiOrder + "/searchOrderCodeAndStatus?orderCode=" + $scope.orderCode + "&orderStatus=WAIT_FOR_CONFIRMATION")
                    .then(response => {
                        $scope.isLoading = false;
                        $scope.orderwaitconfirms = response.data;
                        $scope.orderwaitconfirms.map(order => {
                            var totalMoney = 0;
                            if (order.orderDetails && order.orderDetails.length) {
                                order.orderDetails.forEach(orderDetail => {
                                    totalMoney += orderDetail.price * orderDetail.quantity;
                                })
                            }
                            if (order.voucher) {
                                totalMoney -= order.voucher.promotion;
                            }
                            order.totalMoney = totalMoney + order.totalShip;
                        })
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
        findByTimeWaitConfirm = (beginDate, endDate) => {
            $scope.isLoading = true;
            $http.get(apiOrder + "/findByTimeAndStatus?beginDate=" + beginDate + "&endDate=" + endDate + "&status=WAIT_FOR_CONFIRMATION")
                .then(response => {
                    $scope.isLoading = false;
                    $scope.orderwaitconfirms = response.data;
                    $scope.orderwaitconfirms.map(order => {
                        var totalMoney = 0;
                        if (order.orderDetails && order.orderDetails.length) {
                            order.orderDetails.forEach(orderDetail => {
                                totalMoney += orderDetail.price * orderDetail.quantity;
                            })
                        }
                        if (order.voucher) {
                            totalMoney -= order.voucher.promotion;
                        }
                        order.totalMoney = totalMoney + order.totalShip;
                    })
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
        $scope.changeBeginDateWaitConfirm = () => {
            $scope.beginDatea = $filter('date')($scope.beginDate, 'yyyy-MM-dd');
            if ($scope.endDatea) {
                findByTimeWaitConfirm($scope.beginDatea + "", $scope.endDatea + "");
            }
        }

        // tìm kiếm theo khoảng thời gian
        $scope.changeEndDateWaitConfirm = () => {
            $scope.endDatea = $filter('date')($scope.endDate, 'yyyy-MM-dd');
            if ($scope.beginDatea) {
                findByTimeWaitConfirm($scope.beginDatea, $scope.endDatea);
            }
        }

        $scope.findByTotal = '';
        //tìm kiếm theo khoảng giá tổng tiền đơn hàng
        findBytotalWaitConfirm = (beginMoney, endMoney) => {
            $http.get(apiOrder + "/totalMoneyAndStatus?beginMoney=" + beginMoney + "&endMoney=" + endMoney + "&status=WAIT_FOR_CONFIRMATION")
                .then(res => {
                    $scope.orderwaitconfirms = res.data;
                    $scope.orderwaitconfirms.map(order => {
                        var totalMoney = 0;
                        if (order.orderDetails && order.orderDetails.length) {
                            order.orderDetails.forEach(orderDetail => {
                                totalMoney += orderDetail.price * orderDetail.quantity;
                            })
                        }
                        if (order.voucher) {
                            totalMoney -= order.voucher.promotion;
                        }
                        order.totalMoney = totalMoney + order.totalShip;
                    })
                })
                .catch(err => {
                    console.log(err);
                    $scope.isSuccess = false;
                    $scope.message = "Có lỗi xảy ra khi lọc đơn hàng";
                    alertShow();
                })
        }
        $scope.findOrderByTotalMoneyWaitConfirm = () => {
            if ($scope.findByTotal) {
                if ($scope.findByTotal == 1) {
                    //tìm các đơn hàng từ 0-> 1tr
                    findBytotalWaitConfirm(0, 1000000);
                } else if ($scope.findByTotal == 2) {
                    //tìm các đơn hàng từ 1-> 3tr
                    findBytotalWaitConfirm(1000000, 3000000);
                } else if ($scope.findByTotal == 3) {
                    //tìm các đơn hàng từ 3-> 5tr
                    findBytotalWaitConfirm(3000000, 5000000);
                }
            }
            if ($scope.findByTotalBegin && $scope.findByTotalEnd) {
                findBytotalWaitConfirm($scope.findByTotalBegin, $scope.findByTotalEnd);
            }
        }

        $scope.resetOrderWaitConfirm = () => {
            $scope.beginDate = null;
            $scope.endDate = null;
            $scope.findByTotalBegin = $scope.findByTotalEnd = '';
            $scope.findByTotal = '';
            getAllOrderWaitConfirm(0, $scope.status = "WAIT_FOR_CONFIRMATION");
        }
    }
    // end don hang by status waitconfirm
    //-------------------------------------------------------------------------------------------------------//
    // start don hang by status confirmed
    {
        getAllOrderConfirmed = (page, status) => {
            $scope.isLoading = true;
            $http.get(apiOrder + "/status" + "?page=" + page + "&status=" + status)
                .then(function (response) {
                    $scope.orderconfirmeds = response.data[0];
                    $scope.totalPage = response.data[1];
                    $scope.isLoading = false;
                    $scope.countConfirmed = response.data[1];
                    $scope.orderconfirmeds.map(order => {
                        var totalMoney = 0;
                        if (order.orderDetails && order.orderDetails.length) {
                            order.orderDetails.forEach(orderDetail => {
                                totalMoney += orderDetail.price * orderDetail.quantity;
                            })
                        }
                        if (order.voucher) {
                            totalMoney -= order.voucher.promotion;
                        }
                        order.totalMoney = totalMoney + order.totalShip;
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
        getAllOrderConfirmed(0, $scope.status = "CONFIRMED");

        $scope.pageIndexConfirmed = 0;
        $scope.prevConfirmed = () => {
            if ($scope.pageIndexConfirmed <= 0) {
                $scope.pageIndexConfirmed = 0;
                getAllOrderConfirmed(0, $scope.status = "CONFIRMED");
            } else {
                $scope.pageIndexConfirmed--;
                getAllOrderConfirmed($scope.pageIndexConfirmed, $scope.status = "CONFIRMED");
            }
        }

        $scope.nextConfirmed = () => {
            if ($scope.pageIndexConfirmed == $scope.totalPage - 1) {
                $scope.pageIndexConfirmed = $scope.totalPage - 1;
                getAllOrderConfirmed($scope.totalPage - 1, $scope.status = "CONFIRMED");
            } else {
                $scope.pageIndexConfirmed++;
                getAllOrderConfirmed($scope.pageIndexConfirmed, $scope.status = "CONFIRMED");
            }
        }

        /**cập nhật trạng thái đơn hàng */
        updateStatused = (order, message, index) => {
            $http.put(apiOrder + "/update-status", order)
                .then(async response => {
                    $scope.orderwaitshippers.unshift(order);
                    $scope.orderconfirmeds.splice(index, 1);
                    $scope.isLoading = false;
                    $scope.isSuccess = true;
                    $scope.message = message;
                    alertShow();
                    // Lấy tab đang xử lý (waitfortheshippertopickup)
                    var tabwaitfortheshippertopickup = document.getElementById("waitfortheshippertopickup-tab");
                    // Kích hoạt sự kiện click vào tab đó
                    tabwaitfortheshippertopickup.click();
                })
                .catch((error) => {
                    console.log(error);
                    $scope.isSuccess = false;
                    $scope.isLoading = false;
                    $scope.message = "Có lỗi xảy ra, vui lòng thử lại !"
                    alertShow();
                });
        }

        /**Xác nhận đơn hàng */
        $scope.confirmOrdered = (order, index) => {
            var message = "Đơn hàng đã chuẩn bị thành công và chờ shipper giao!"
            order.status = "WAIT_FOR_THE_SHIPPER_TO_PICK_UP";
            updateStatused(order, message, index);
            /**nếu trạng thái đơn hàng là chuẩn bị hàng thành công -> đăng đơn lên GHN */
            // await getInfoShop();
            var orderResponse = order;
            var items = [];

            var weight = 0;
            var height = 0;
            var cod_amount = 0; /**tien thu hộ khi thanh toán off */
            var payment_type_id = 2; /**thu tien nguoi ban(1) or nguoi nhan(2) */

            order.orderDetails.map(item => {
                var product = {
                    name: item.product.name,
                    code: item.productDetail.id + "",
                    quantity: item.quantity
                }
                items.push(angular.copy(product)); /**danh sach cac san pham trong don hang GHN */
                weight = weight + (item.product.weight.weight * item.quantity);
                height += 12;
                if (order.paymentType == "OFFLINE") {
                    cod_amount = cod_amount + (item.price * item.quantity);
                    payment_type_id = 2;
                } else {
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
                    order.codeGHN = orderCodeGHN;
                    if (order.codeGHN) {
                        $http.post(apiOrder, order)
                            .then(response => { })
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
            alertShow();
        }

        /**tim kiem san pham khi cap nhật sản phẩm trong hóa đơn */
        getAllProductConfirmed = (api) => {
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

        $scope.showAllProductConfirmed = () => {
            getAllProductWaitConfirm(apiProduct);
        }

        /**tim kiem sp theo ten */
        $scope.nameProduct = '';
        $scope.searchProductConfirmed = () => {
            console.log($scope.nameProduct);
            if ($scope.nameProduct) {
                getAllProduct(apiProduct + "/get-by-name?name=" + $scope.nameProduct);
            } else {
                $scope.nameProduct = "";
                getAllProduct(apiProduct);
            }
        }

        /**chon san pham trong danh sach, param: vị tri product, vi tri productDetail, vi tri order hien tai */
        $scope.chooseProductConfirmed = (product, productDetail, indexOrder) => {
            var indexProduct = null;
            var result = $scope.orderconfirmeds[indexOrder].orderDetails.filter((item, index) => {
                if (item.id == productDetail.id) {
                    indexProduct = index;
                }
                return productDetail.id === item.productDetail.id;
            })
            if (result.length == 0) {
                $scope.orderDetail.orderId = $scope.orderconfirmeds[indexOrder].id;
                $scope.orderDetail.price = product.price;
                $scope.orderDetail.product = product;
                $scope.orderDetail.productDetail = productDetail;
                $scope.orderDetail.quantity = 1;
                $scope.orderconfirmeds[indexOrder].orderDetails.push(angular.copy($scope.orderDetail));

            } else {
                $scope.orderconfirmeds[indexOrder].orderDetails[indexProduct].quantity++;
            }
            totalOrderConfirmed($scope.orderconfirmeds[indexOrder]);
        }

        $scope.totalMoney = 0;
        /**tinh tong tien cua don hang */
        totalOrderConfirmed = (order) => {
            totalMoney = 0;
            order.orderDetails.map(item => {
                totalMoney += item.price * item.quantity;
                if (order.voucher) {
                    totalMoney -= order.voucher.promotion;
                }
                order.totalMoney = totalMoney + order.totalShip;
            });
        }

        /**thay doi so luong san pham */
        $scope.changeQuantityConfirmed = (indexOrder) => {
            totalOrderConfirmed($scope.orderconfirmeds[indexOrder]);
        }

        /** xoa sp trong don hang */
        $scope.aconfirmed = (indexOrderDetail, indexOrder) => {
            $scope.orderconfirmeds[indexOrder].orderDetails.splice(indexOrderDetail, 1);
            totalOrderConfirmed($scope.orderconfirmeds[indexOrder]);
        }

        /**Cập nhật sản phẩm trong đơn hàng */
        $scope.updateOrderConfirmed = (indexOrder) => {
            $scope.isLoading = true;
            console.log($scope.orderconfirmeds[indexOrder]);
            $http.post(apiOrder, $scope.orderconfirmeds[indexOrder])
                .then(response => {
                    $scope.isLoading = true;
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

        $scope.chosesOrderUpdateConfirmed = (index) => {
            totalOrder($scope.orderconfirmeds[index]);
        }

        //tìm kiếm đơn hàng
        $scope.searchOrderConfirmed = () => {
            $scope.isLoading = true;
            if ($scope.orderCode && $scope.orderCode.length > 1) {
                $http.get(apiOrder + "/searchOrderCodeAndStatus?orderCode=" + $scope.orderCode + "&orderStatus=CONFIRMED")
                    .then(response => {
                        $scope.isLoading = false;
                        $scope.orderconfirmeds = response.data;
                        $scope.orderconfirmeds.map(order => {
                            var totalMoney = 0;
                            if (order.orderDetails && order.orderDetails.length) {
                                order.orderDetails.forEach(orderDetail => {
                                    totalMoney += orderDetail.price * orderDetail.quantity;
                                })
                            }
                            if (order.voucher) {
                                totalMoney -= order.voucher.promotion;
                            }
                            order.totalMoney = totalMoney + order.totalShip;
                        })
                    })
                    .catch(error => {
                        console.log(error);
                        $scope.isLoading = false;
                        $scope.isSuccess = false;
                        $scope.message = "Có lỗi xảy ra, vui lòng thử lại"
                        alertShow();
                    })
            } else {
                getAllOrder(0, '');
            }
        }

        // tìm kiếm theo khoảng thời gian
        findByTimeConfirmed = (beginDate, endDate) => {
            $scope.isLoading = true;
            $http.get(apiOrder + "/findByTimeAndStatus?beginDate=" + beginDate + "&endDate=" + endDate + "&status=CONFIRMED")
                .then(response => {
                    $scope.isLoading = false;
                    $scope.orderconfirmeds = response.data;
                    $scope.orderconfirmeds.map(order => {
                        var totalMoney = 0;
                        if (order.orderDetails && order.orderDetails.length) {
                            order.orderDetails.forEach(orderDetail => {
                                totalMoney += orderDetail.price * orderDetail.quantity;
                            })
                        }
                        if (order.voucher) {
                            totalMoney -= order.voucher.promotion;
                        }
                        order.totalMoney = totalMoney + order.totalShip;
                    })
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
        $scope.changeBeginDateConfirmed = () => {
            $scope.beginDatea = $filter('date')($scope.beginDate, 'yyyy-MM-dd');
            if ($scope.endDatea) {
                findByTimeConfirmed($scope.beginDatea + "", $scope.endDatea + "");
            }
        }

        // tìm kiếm theo khoảng thời gian
        $scope.changeEndDateConfirmed = () => {
            $scope.endDatea = $filter('date')($scope.endDate, 'yyyy-MM-dd');
            if ($scope.beginDatea) {
                findByTimeConfirmed($scope.beginDatea, $scope.endDatea);
            }
        }

        $scope.findByTotal = '';
        //tìm kiếm theo khoảng giá tổng tiền đơn hàng
        findBytotalConfirmed = (beginMoney, endMoney) => {
            $http.get(apiOrder + "/totalMoneyAndStatus?beginMoney=" + beginMoney + "&endMoney=" + endMoney + "&status=CONFIRMED")
                .then(res => {
                    $scope.orderconfirmeds = res.data;
                    $scope.orderconfirmeds.map(order => {
                        var totalMoney = 0;
                        if (order.orderDetails && order.orderDetails.length) {
                            order.orderDetails.forEach(orderDetail => {
                                totalMoney += orderDetail.price * orderDetail.quantity;
                            })
                        }
                        if (order.voucher) {
                            totalMoney -= order.voucher.promotion;
                        }
                        order.totalMoney = totalMoney + order.totalShip;
                    })
                })
                .catch(err => {
                    console.log(err);
                    $scope.isSuccess = false;
                    $scope.message = "Có lỗi xảy ra khi lọc đơn hàng";
                    alertShow();
                })
        }
        $scope.findOrderByTotalMoneyConfirmed = () => {
            if ($scope.findByTotal) {
                if ($scope.findByTotal == 1) {
                    //tìm các đơn hàng từ 0-> 1tr
                    findBytotalConfirmed(0, 1000000);
                } else if ($scope.findByTotal == 2) {
                    //tìm các đơn hàng từ 1-> 3tr
                    findBytotalConfirmed(1000000, 3000000);
                } else if ($scope.findByTotal == 3) {
                    //tìm các đơn hàng từ 3-> 5tr
                    findBytotalConfirmed(3000000, 5000000);
                }
            }
            if ($scope.findByTotalBegin && $scope.findByTotalEnd) {
                findBytotalConfirmed($scope.findByTotalBegin, $scope.findByTotalEnd);
            }
        }

        $scope.resetOrderConfirmed = () => {
            $scope.beginDate = null;
            $scope.endDate = null;
            $scope.findByTotalBegin = $scope.findByTotalEnd = '';
            $scope.findByTotal = '';
            getAllOrderConfirmed(0, $scope.status = "CONFIRMED");
        }
    }
    // end don hang by status confirmed
    //-------------------------------------------------------------------------------------------------------//
    // start don hang by status WAIT_FOR_THE_SHIPPER_TO_PICK_UP
    {
        getAllOrderWaitShipper = (page, status) => {
            $scope.isLoading = true;
            $http.get(apiOrder + "/status" + "?page=" + page + "&status=" + status)
                .then(function (response) {
                    $scope.orderwaitshippers = response.data[0];
                    $scope.totalPage = response.data[1];
                    $scope.isLoading = false;
                    $scope.countWaitShipper = response.data[1];
                    $scope.orderwaitshippers.map(order => {
                        var totalMoney = 0;
                        if (order.orderDetails && order.orderDetails.length) {
                            order.orderDetails.forEach(orderDetail => {
                                totalMoney += orderDetail.price * orderDetail.quantity;
                            })
                        }
                        if (order.voucher) {
                            totalMoney -= order.voucher.promotion;
                        }
                        order.totalMoney = totalMoney + order.totalShip;
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
        getAllOrderWaitShipper(0, $scope.status = "WAIT_FOR_THE_SHIPPER_TO_PICK_UP");

        $scope.pageIndexWaitShipper = 0;
        $scope.prevWaitShipper = () => {
            if ($scope.pageIndexWaitShipper <= 0) {
                $scope.pageIndexWaitShipper = 0;
                getAllOrderWaitShipper(0, $scope.status = "WAIT_FOR_THE_SHIPPER_TO_PICK_UP");
            } else {
                $scope.pageIndexWaitShipper--;
                getAllOrderWaitShipper($scope.pageIndexWaitShipper, $scope.status = "WAIT_FOR_THE_SHIPPER_TO_PICK_UP");
            }
        }

        $scope.nextWaitShipper = () => {
            if ($scope.pageIndexWaitShipper == $scope.totalPage - 1) {
                $scope.pageIndexWaitShipper = $scope.totalPage - 1;
                getAllOrderWaitShipper($scope.totalPage - 1, $scope.status = "WAIT_FOR_THE_SHIPPER_TO_PICK_UP");
            } else {
                $scope.pageIndexWaitShipper++;
                getAllOrderWaitShipper($scope.pageIndexWaitShipper, $scope.status = "WAIT_FOR_THE_SHIPPER_TO_PICK_UP");
            }
        }

        /**cập nhật trạng thái đơn hàng */
        updateStatusWaitShipper = (order, message, index) => {
            $http.put(apiOrder + "/update-status", order)
                .then(async response => {
                    $scope.isLoading = false;
                    $scope.isSuccess = true;
                    $scope.message = message;
                    alertShow();
                    $scope.orderwaitshippers.splice(index, 1);
                })
                .catch((error) => {
                    console.log(error);
                    $scope.isSuccess = false;
                    $scope.isLoading = false;
                    $scope.message = "Có lỗi xảy ra, vui lòng thử lại !"
                    alertShow();
                });
        }

        /**hủy đơn hàng */
        $scope.cancelOrder = (order, index) => {
            order.status = "CANCELLED"
            $http.post(apiOrder, order)
                .then(async response => {
                    $scope.isSuccess = true;
                    $scope.message = "Hủy đơn hàng thành công";
                    $scope.orderwaitshippers.splice(index, 1);
                    alertShow();
                })
                .catch(error => {
                    console.log(error);
                    $scope.message = "Có lỗi xảy ra khi hủy đơn hàng trên GHN";
                    alertShow();
                })
            $scope.orderCanceled.unshift(order);
            // Lấy tab đang xử lý (canceled)
            var tabCanceled = document.getElementById("canceled-tab");
            // Kích hoạt sự kiện click vào tab đó
            tabCanceled.click();
        }

        $scope.updateStatusOrderWaitShipper = (order, index) => {
            var message = "Đơn hàng đã giao cho shipper thành công!"
            order.status = "DELIVERING";
            updateStatusWaitShipper(order, message, index);
            $scope.orderDelivering.unshift(order);
            // Lấy tab đang xử lý (delivering)
            var tabDelivering = document.getElementById("delivering-tab");
            // Kích hoạt sự kiện click vào tab đó
            tabDelivering.click();
        }

        /**tim kiem san pham khi cap nhật sản phẩm trong hóa đơn */
        getAllProductWaitShipper = (api) => {
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

        $scope.showAllProductWaitShipper = () => {
            getAllProductWaitShipper(apiProduct);
        }

        /**tim kiem sp theo ten */
        $scope.nameProduct = '';
        $scope.searchProductWaitShipper = () => {
            console.log($scope.nameProduct);
            if ($scope.nameProduct) {
                getAllProduct(apiProduct + "/get-by-name?name=" + $scope.nameProduct);
            } else {
                $scope.nameProduct = "";
                getAllProduct(apiProduct);
            }
        }

        /**chon san pham trong danh sach, param: vị tri product, vi tri productDetail, vi tri order hien tai */
        $scope.chooseProductWaitShipper = (product, productDetail, indexOrder) => {
            var indexProduct = null;
            var result = $scope.orderwaitshippers[indexOrder].orderDetails.filter((item, index) => {
                if (item.id == productDetail.id) {
                    indexProduct = index;
                }
                return productDetail.id === item.productDetail.id;
            })
            if (result.length == 0) {
                $scope.orderDetail.orderId = $scope.orderwaitshippers[indexOrder].id;
                $scope.orderDetail.price = product.price;
                $scope.orderDetail.product = product;
                $scope.orderDetail.productDetail = productDetail;
                $scope.orderDetail.quantity = 1;
                $scope.orderwaitshippers[indexOrder].orderDetails.push(angular.copy($scope.orderDetail));

            } else {
                $scope.orderwaitshippers[indexOrder].orderDetails[indexProduct].quantity++;
            }
            totalOrderWaitShipper($scope.orderwaitshippers[indexOrder]);
        }

        $scope.totalMoney = 0;
        /**tinh tong tien cua don hang */
        totalOrderWaitShipper = (order) => {
            totalMoney = 0;
            order.orderDetails.map(item => {
                totalMoney += item.price * item.quantity;
                if (order.voucher) {
                    totalMoney -= order.voucher.promotion;
                }
                order.totalMoney = totalMoney + order.totalShip;
            });
        }

        /**thay doi so luong san pham */
        $scope.changeQuantityWaitShipper = (indexOrder) => {
            totalOrderWaitShipper($scope.orderwaitshippers[indexOrder]);
        }

        /** xoa sp trong don hang */
        $scope.aWaitShipper = (indexOrderDetail, indexOrder) => {
            $scope.orderwaitshippers[indexOrder].orderDetails.splice(indexOrderDetail, 1);
            totalOrderWaitShipper($scope.orderwaitshippers[indexOrder]);
        }

        /**Cập nhật sản phẩm trong đơn hàng */
        $scope.updateOrderWaitShipper = (indexOrder) => {
            $scope.isLoading = true;
            console.log($scope.orderwaitshippers[indexOrder]);
            $http.post(apiOrder, $scope.orderwaitshippers[indexOrder])
                .then(response => {
                    $scope.isLoading = true;
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

        $scope.chosesOrderUpdateWaitShipper = (index) => {
            totalOrder($scope.orderwaitshippers[index]);
        }

        //tìm kiếm đơn hàng
        $scope.searchOrderWaitShipper = () => {
            $scope.isLoading = true;
            if ($scope.orderCode && $scope.orderCode.length > 1) {
                $http.get(apiOrder + "/searchOrderCodeAndStatus?orderCode=" + $scope.orderCode + "&orderStatus=WAIT_FOR_THE_SHIPPER_TO_PICK_UP")
                    .then(response => {
                        $scope.isLoading = false;
                        $scope.orderwaitshippers = response.data;
                        $scope.orderwaitshippers.map(order => {
                            var totalMoney = 0;
                            if (order.orderDetails && order.orderDetails.length) {
                                order.orderDetails.forEach(orderDetail => {
                                    totalMoney += orderDetail.price * orderDetail.quantity;
                                })
                            }
                            if (order.voucher) {
                                totalMoney -= order.voucher.promotion;
                            }
                            order.totalMoney = totalMoney + order.totalShip;
                        })
                    })
                    .catch(error => {
                        console.log(error);
                        $scope.isLoading = false;
                        $scope.isSuccess = false;
                        $scope.message = "Có lỗi xảy ra, vui lòng thử lại"
                        alertShow();
                    })
            } else {
                getAllOrder(0, '');
            }
        }

        // tìm kiếm theo khoảng thời gian
        findByTimeWaitShipper = (beginDate, endDate) => {
            $scope.isLoading = true;
            $http.get(apiOrder + "/findByTimeAndStatus?beginDate=" + beginDate + "&endDate=" + endDate + "&status=WAIT_FOR_THE_SHIPPER_TO_PICK_UP")
                .then(response => {
                    $scope.isLoading = false;
                    $scope.orderwaitshippers = response.data;
                    $scope.orderwaitshippers.map(order => {
                        var totalMoney = 0;
                        if (order.orderDetails && order.orderDetails.length) {
                            order.orderDetails.forEach(orderDetail => {
                                totalMoney += orderDetail.price * orderDetail.quantity;
                            })
                        }
                        if (order.voucher) {
                            totalMoney -= order.voucher.promotion;
                        }
                        order.totalMoney = totalMoney + order.totalShip;
                    })
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
        $scope.changeBeginDateWaitShipper = () => {
            $scope.beginDatea = $filter('date')($scope.beginDate, 'yyyy-MM-dd');
            if ($scope.endDatea) {
                findByTimeWaitShipper($scope.beginDatea + "", $scope.endDatea + "");
            }
        }

        // tìm kiếm theo khoảng thời gian
        $scope.changeEndDateWaitShipper = () => {
            $scope.endDatea = $filter('date')($scope.endDate, 'yyyy-MM-dd');
            if ($scope.beginDatea) {
                findByTimeWaitShipper($scope.beginDatea, $scope.endDatea);
            }
        }

        $scope.findByTotal = '';
        //tìm kiếm theo khoảng giá tổng tiền đơn hàng
        findBytotalWaitShipper = (beginMoney, endMoney) => {
            $http.get(apiOrder + "/totalMoneyAndStatus?beginMoney=" + beginMoney + "&endMoney=" + endMoney) + "&status=WAIT_FOR_THE_SHIPPER_TO_PICK_UP"
                .then(res => {
                    $scope.orderwaitshippers = res.data;
                    $scope.orderwaitshippers.map(order => {
                        var totalMoney = 0;
                        if (order.orderDetails && order.orderDetails.length) {
                            order.orderDetails.forEach(orderDetail => {
                                totalMoney += orderDetail.price * orderDetail.quantity;
                            })
                        }
                        if (order.voucher) {
                            totalMoney -= order.voucher.promotion;
                        }
                        order.totalMoney = totalMoney + order.totalShip;
                    })
                })
                .catch(err => {
                    console.log(err);
                    $scope.isSuccess = false;
                    $scope.message = "Có lỗi xảy ra khi lọc đơn hàng";
                    alertShow();
                })
        }
        $scope.findOrderByTotalMoneyWaitShipper = () => {
            if ($scope.findByTotal) {
                if ($scope.findByTotal == 1) {
                    //tìm các đơn hàng từ 0-> 1tr
                    findBytotalWaitShipper(0, 1000000);
                } else if ($scope.findByTotal == 2) {
                    //tìm các đơn hàng từ 1-> 3tr
                    findBytotalWaitShipper(1000000, 3000000);
                } else if ($scope.findByTotal == 3) {
                    //tìm các đơn hàng từ 3-> 5tr
                    findBytotalWaitShipper(3000000, 5000000);
                }
            }
            if ($scope.findByTotalBegin && $scope.findByTotalEnd) {
                findBytotalWaitShipper($scope.findByTotalBegin, $scope.findByTotalEnd);
            }
        }

        $scope.resetOrderWaitShipper = () => {
            $scope.beginDate = null;
            $scope.endDate = null;
            $scope.findByTotalBegin = $scope.findByTotalEnd = '';
            $scope.findByTotal = '';
            getAllOrderWaitShipper(0, $scope.status = "WAIT_FOR_THE_SHIPPER_TO_PICK_UP");
        }
    }
    // end don hang by status WAIT_FOR_THE_SHIPPER_TO_PICK_UP
    //-------------------------------------------------------------------------------------------------------//
    // start don hang by status DELIVERING
    {
        getAllOrderDelivering = (page, status) => {
            $scope.isLoading = true;
            $http.get(apiOrder + "/status" + "?page=" + page + "&status=" + status)
                .then(function (response) {
                    $scope.orderDelivering = response.data[0];
                    $scope.totalPage = response.data[1];
                    $scope.isLoading = false;
                    $scope.countDelivering = response.data[1];
                    $scope.orderDelivering.map(order => {
                        var totalMoney = 0;
                        if (order.orderDetails && order.orderDetails.length) {
                            order.orderDetails.forEach(orderDetail => {
                                totalMoney += orderDetail.price * orderDetail.quantity;
                            })
                        }
                        if (order.voucher) {
                            totalMoney -= order.voucher.promotion;
                        }
                        order.totalMoney = totalMoney + order.totalShip;
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
        getAllOrderDelivering(0, $scope.status = "DELIVERING");

        $scope.pageIndexDelivering = 0;
        $scope.prevDelivering = () => {
            if ($scope.pageIndexDelivering <= 0) {
                $scope.pageIndexDelivering = 0;
                getAllOrderDelivering(0, $scope.status = "DELIVERING");
            } else {
                $scope.pageIndexDelivering--;
                getAllOrderDelivering($scope.pageIndexDelivering, $scope.status = "DELIVERING");
            }
        }

        $scope.nextDelivering = () => {
            if ($scope.pageIndexDelivering == $scope.totalPage - 1) {
                $scope.pageIndexDelivering = $scope.totalPage - 1;
                getAllOrderDelivering($scope.totalPage - 1, $scope.status = "DELIVERING");
            } else {
                $scope.pageIndexDelivering++;
                getAllOrderDelivering($scope.pageIndexDelivering, $scope.status = "DELIVERING");
            }
        }

        /**cập nhật trạng thái đơn hàng */
        updateStatusDelivering = (order, message, index) => {
            $http.put(apiOrder + "/update-status", order)
                .then(async response => {
                    if (order.status == "DELIVERED") {
                        $scope.orderDelivered.unshift(order);
                    }
                    if (order.status == "NO_DELIVERY") {
                        $scope.orderNoDelivery.unshift(order);
                    }
                    $scope.orderDelivering.splice(index, 1);
                    $scope.isLoading = false;
                    $scope.isSuccess = true;
                    $scope.message = message;
                    alertShow();
                    if (order.status == "DELIVERED") {
                        // Lấy tab đang xử lý (delivered)
                        var tabDelivered = document.getElementById("delivered-tab");
                        // Kích hoạt sự kiện click vào tab đó
                        tabDelivered.click();
                    }
                    if (order.status == "NO_DELIVERY") {
                        // Lấy tab đang xử lý (nodelivery)
                        var tabnodelivery = document.getElementById("nodelivery-tab");
                        // Kích hoạt sự kiện click vào tab đó
                        tabnodelivery.click();
                    }
                })
                .catch((error) => {
                    console.log(error);
                    $scope.isSuccess = false;
                    $scope.isLoading = false;
                    $scope.message = "Có lỗi xảy ra, vui lòng thử lại !"
                    alertShow();
                });
        }

        $scope.updateStatusOrderDelivering = (order, index) => {
            var message = "Đơn hàng đã giao thành công!"
            order.status = "DELIVERED";
            updateStatusDelivering(order, message, index);
        }

        $scope.noDeliveryOrder = (order, index) => {
            var message = "Không giao được hàng và đơn hàng đã chuyển vào không giao được!"
            order.status = "NO_DELIVERY";
            updateStatusDelivering(order, message, index);
        }

        //tìm kiếm đơn hàng
        $scope.searchOrderDelivering = () => {
            $scope.isLoading = true;
            if ($scope.orderCode && $scope.orderCode.length > 1) {
                $http.get(apiOrder + "/searchOrderCodeAndStatus?orderCode=" + $scope.orderCode + "&orderStatus=DELIVERING")
                    .then(response => {
                        $scope.isLoading = false;
                        $scope.orderDelivering = response.data;
                        $scope.orderDelivering.map(order => {
                            var totalMoney = 0;
                            if (order.orderDetails && order.orderDetails.length) {
                                order.orderDetails.forEach(orderDetail => {
                                    totalMoney += orderDetail.price * orderDetail.quantity;
                                })
                            }
                            if (order.voucher) {
                                totalMoney -= order.voucher.promotion;
                            }
                            order.totalMoney = totalMoney + order.totalShip;
                        })
                    })
                    .catch(error => {
                        console.log(error);
                        $scope.isLoading = false;
                        $scope.isSuccess = false;
                        $scope.message = "Có lỗi xảy ra, vui lòng thử lại"
                        alertShow();
                    })
            } else {
                getAllOrder(0, '');
            }
        }

        // tìm kiếm theo khoảng thời gian
        findByTimeDelivering = (beginDate, endDate) => {
            $scope.isLoading = true;
            $http.get(apiOrder + "/findByTimeAndStatus?beginDate=" + beginDate + "&endDate=" + endDate + "&status=DELIVERING")
                .then(response => {
                    $scope.isLoading = false;
                    $scope.orderDelivering = response.data;
                    $scope.orderDelivering.map(order => {
                        var totalMoney = 0;
                        if (order.orderDetails && order.orderDetails.length) {
                            order.orderDetails.forEach(orderDetail => {
                                totalMoney += orderDetail.price * orderDetail.quantity;
                            })
                        }
                        if (order.voucher) {
                            totalMoney -= order.voucher.promotion;
                        }
                        order.totalMoney = totalMoney + order.totalShip;
                    })
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
        $scope.changeBeginDateDelivering = () => {
            $scope.beginDatea = $filter('date')($scope.beginDate, 'yyyy-MM-dd');
            if ($scope.endDatea) {
                findByTimeDelivering($scope.beginDatea + "", $scope.endDatea + "");
            }
        }

        // tìm kiếm theo khoảng thời gian
        $scope.changeEndDateDelivering = () => {
            $scope.endDatea = $filter('date')($scope.endDate, 'yyyy-MM-dd');
            if ($scope.beginDatea) {
                findByTimeWaitShipper($scope.beginDatea, $scope.endDatea);
            }
        }

        $scope.findByTotal = '';
        //tìm kiếm theo khoảng giá tổng tiền đơn hàng
        findBytotalDelivering = (beginMoney, endMoney) => {
            $http.get(apiOrder + "/totalMoneyAndStatus?beginMoney=" + beginMoney + "&endMoney=" + endMoney + "&status=DELIVERING")
                .then(res => {
                    $scope.orderDelivering = res.data;
                    $scope.orderDelivering.map(order => {
                        var totalMoney = 0;
                        if (order.orderDetails && order.orderDetails.length) {
                            order.orderDetails.forEach(orderDetail => {
                                totalMoney += orderDetail.price * orderDetail.quantity;
                            })
                        }
                        if (order.voucher) {
                            totalMoney -= order.voucher.promotion;
                        }
                        order.totalMoney = totalMoney + order.totalShip;
                    })
                })
                .catch(err => {
                    console.log(err);
                    $scope.isSuccess = false;
                    $scope.message = "Có lỗi xảy ra khi lọc đơn hàng";
                    alertShow();
                })
        }
        $scope.findOrderByTotalMoneyDelivering = () => {
            if ($scope.findByTotal) {
                if ($scope.findByTotal == 1) {
                    //tìm các đơn hàng từ 0-> 1tr
                    findBytotalDelivering(0, 1000000);
                } else if ($scope.findByTotal == 2) {
                    //tìm các đơn hàng từ 1-> 3tr
                    findBytotalDelivering(1000000, 3000000);
                } else if ($scope.findByTotal == 3) {
                    //tìm các đơn hàng từ 3-> 5tr
                    findBytotalDelivering(3000000, 5000000);
                }
            }
            if ($scope.findByTotalBegin && $scope.findByTotalEnd) {
                findBytotalDelivering($scope.findByTotalBegin, $scope.findByTotalEnd);
            }
        }

        $scope.resetOrderDelivering = () => {
            $scope.beginDate = null;
            $scope.endDate = null;
            $scope.findByTotalBegin = $scope.findByTotalEnd = '';
            $scope.findByTotal = '';
            getAllOrderDelivering(0, $scope.status = "DELIVERING");
        }
    }
    // end don hang by status DELIVERING
    //-------------------------------------------------------------------------------------------------------//
    // start don hang by status DELIVERED
    {
        getAllOrderDelivered = (page, status) => {
            $scope.isLoading = true;
            $http.get(apiOrder + "/status" + "?page=" + page + "&status=" + status)
                .then(function (response) {
                    $scope.orderDelivered = response.data[0];
                    $scope.totalPage = response.data[1];
                    $scope.isLoading = false;
                    $scope.countDelivered = response.data[1];
                    $scope.orderDelivered.map(order => {
                        var totalMoney = 0;
                        if (order.orderDetails && order.orderDetails.length) {
                            order.orderDetails.forEach(orderDetail => {
                                totalMoney += orderDetail.price * orderDetail.quantity;
                            })
                        }
                        if (order.voucher) {
                            totalMoney -= order.voucher.promotion;
                        }
                        order.totalMoney = totalMoney + order.totalShip;
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
        getAllOrderDelivered(0, $scope.status = "DELIVERED");

        $scope.pageIndexDelivered = 0;
        $scope.prevDelivered = () => {
            if ($scope.pageIndexDelivered <= 0) {
                $scope.pageIndexDelivered = 0;
                getAllOrderDelivered(0, $scope.status = "DELIVERED");
            } else {
                $scope.pageIndexDelivered--;
                getAllOrderDelivered($scope.pageIndexDelivered, $scope.status = "DELIVERED");
            }
        }

        $scope.nextDelivered = () => {
            if ($scope.pageIndexDelivered == $scope.totalPage - 1) {
                $scope.pageIndexDelivered = $scope.totalPage - 1;
                getAllOrderDelivered($scope.totalPage - 1, $scope.status = "DELIVERED");
            } else {
                $scope.pageIndexDelivered++;
                getAllOrderDelivered($scope.pageIndexDelivered, $scope.status = "DELIVERED");
            }
        }

        //tìm kiếm đơn hàng
        $scope.searchOrderDelivered = () => {
            $scope.isLoading = true;
            if ($scope.orderCode && $scope.orderCode.length > 1) {
                $http.get(apiOrder + "/searchOrderCodeAndStatus?orderCode=" + $scope.orderCode + "&orderStatus=DELIVERED")
                    .then(response => {
                        $scope.isLoading = false;
                        $scope.orderDelivered = response.data;
                        $scope.orderDelivered.map(order => {
                            var totalMoney = 0;
                            if (order.orderDetails && order.orderDetails.length) {
                                order.orderDetails.forEach(orderDetail => {
                                    totalMoney += orderDetail.price * orderDetail.quantity;
                                })
                            }
                            if (order.voucher) {
                                totalMoney -= order.voucher.promotion;
                            }
                            order.totalMoney = totalMoney + order.totalShip;
                        })
                    })
                    .catch(error => {
                        console.log(error);
                        $scope.isLoading = false;
                        $scope.isSuccess = false;
                        $scope.message = "Có lỗi xảy ra, vui lòng thử lại"
                        alertShow();
                    })
            } else {
                getAllOrder(0, '');
            }
        }

        // tìm kiếm theo khoảng thời gian
        findByTimeDelivered = (beginDate, endDate) => {
            $scope.isLoading = true;
            $http.get(apiOrder + "/findByTimeAndStatus?beginDate=" + beginDate + "&endDate=" + endDate + "&status=DELIVERED")
                .then(response => {
                    $scope.isLoading = false;
                    $scope.orderDelivered = response.data;
                    $scope.orderDelivered.map(order => {
                        var totalMoney = 0;
                        if (order.orderDetails && order.orderDetails.length) {
                            order.orderDetails.forEach(orderDetail => {
                                totalMoney += orderDetail.price * orderDetail.quantity;
                            })
                        }
                        if (order.voucher) {
                            totalMoney -= order.voucher.promotion;
                        }
                        order.totalMoney = totalMoney + order.totalShip;
                    })
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
        $scope.changeBeginDateDelivered = () => {
            $scope.beginDatea = $filter('date')($scope.beginDate, 'yyyy-MM-dd');
            if ($scope.endDatea) {
                findByTimeDelivered($scope.beginDatea + "", $scope.endDatea + "");
            }
        }

        // tìm kiếm theo khoảng thời gian
        $scope.changeEndDateDelivered = () => {
            $scope.endDatea = $filter('date')($scope.endDate, 'yyyy-MM-dd');
            if ($scope.beginDatea) {
                findByTimeWaitShipper($scope.beginDatea, $scope.endDatea);
            }
        }

        $scope.findByTotal = '';
        //tìm kiếm theo khoảng giá tổng tiền đơn hàng
        findBytotalDelivered = (beginMoney, endMoney) => {
            $http.get(apiOrder + "/totalMoneyAndStatus?beginMoney=" + beginMoney + "&endMoney=" + endMoney + "&status=DELIVERED")
                .then(res => {
                    $scope.orderDelivered = res.data;
                    $scope.orderDelivered.map(order => {
                        var totalMoney = 0;
                        if (order.orderDetails && order.orderDetails.length) {
                            order.orderDetails.forEach(orderDetail => {
                                totalMoney += orderDetail.price * orderDetail.quantity;
                            })
                        }
                        if (order.voucher) {
                            totalMoney -= order.voucher.promotion;
                        }
                        order.totalMoney = totalMoney + order.totalShip;
                    })
                })
                .catch(err => {
                    console.log(err);
                    $scope.isSuccess = false;
                    $scope.message = "Có lỗi xảy ra khi lọc đơn hàng";
                    alertShow();
                })
        }
        $scope.findOrderByTotalMoneyDelivered = () => {
            if ($scope.findByTotal) {
                if ($scope.findByTotal == 1) {
                    //tìm các đơn hàng từ 0-> 1tr
                    findBytotalDelivered(0, 1000000);
                } else if ($scope.findByTotal == 2) {
                    //tìm các đơn hàng từ 1-> 3tr
                    findBytotalDelivered(1000000, 3000000);
                } else if ($scope.findByTotal == 3) {
                    //tìm các đơn hàng từ 3-> 5tr
                    findBytotalDelivered(3000000, 5000000);
                }
            }
            if ($scope.findByTotalBegin && $scope.findByTotalEnd) {
                findBytotalDelivered($scope.findByTotalBegin, $scope.findByTotalEnd);
            }
        }

        $scope.resetOrderDelivered = () => {
            $scope.beginDate = null;
            $scope.endDate = null;
            $scope.findByTotalBegin = $scope.findByTotalEnd = '';
            $scope.findByTotal = '';
            getAllOrderDelivered(0, $scope.status = "DELIVERED");
        }
    }
    // end don hang by status DELIVERED
    //-------------------------------------------------------------------------------------------------------//
    // start don hang by status NO_DELIVERY
    {
        getAllOrderNoDelivery = (page, status) => {
            $scope.isLoading = true;
            $http.get(apiOrder + "/status" + "?page=" + page + "&status=" + status)
                .then(function (response) {
                    $scope.orderNoDelivery = response.data[0];
                    $scope.totalPage = response.data[1];
                    $scope.isLoading = false;
                    $scope.countNoDelivery = response.data[1];
                    $scope.orderNoDelivery.map(order => {
                        var totalMoney = 0;
                        if (order.orderDetails && order.orderDetails.length) {
                            order.orderDetails.forEach(orderDetail => {
                                totalMoney += orderDetail.price * orderDetail.quantity;
                            })
                        }
                        if (order.voucher) {
                            totalMoney -= order.voucher.promotion;
                        }
                        order.totalMoney = totalMoney + order.totalShip;
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
        getAllOrderNoDelivery(0, $scope.status = "NO_DELIVERY");

        $scope.pageIndexNoDelivery = 0;
        $scope.prevNoDelivery = () => {
            if ($scope.pageIndexNoDelivery <= 0) {
                $scope.pageIndexNoDelivery = 0;
                getAllOrderNoDelivery(0, $scope.status = "NO_DELIVERY");
            } else {
                $scope.pageIndexNoDelivery--;
                getAllOrderNoDelivery($scope.pageIndexNoDelivery, $scope.status = "NO_DELIVERY");
            }
        }

        $scope.nextNoDelivery = () => {
            if ($scope.pageIndexNoDelivery == $scope.totalPage - 1) {
                $scope.pageIndexNoDelivery = $scope.totalPage - 1;
                getAllOrderNoDelivery($scope.totalPage - 1, $scope.status = "NO_DELIVERY");
            } else {
                $scope.pageIndexNoDelivery++;
                getAllOrderNoDelivery($scope.pageIndexNoDelivery, $scope.status = "NO_DELIVERY");
            }
        }

        /**cập nhật trạng thái đơn hàng */
        updateStatusNoDelivery = (order, message, index) => {
            $http.put(apiOrder + "/update-status", order)
                .then(async response => {
                    $scope.orderwaitshippers.unshift(order);
                    $scope.orderNoDelivery.splice(index, 1);
                    $scope.isLoading = false;
                    $scope.isSuccess = true;
                    $scope.message = message;
                    alertShow();
                    // Lấy tab đang xử lý (waitfortheshippertopickup)
                    var tabwaitfortheshippertopickup = document.getElementById("waitfortheshippertopickup-tab");
                    // Kích hoạt sự kiện click vào tab đó
                    tabwaitfortheshippertopickup.click();
                })
                .catch((error) => {
                    console.log(error);
                    $scope.isSuccess = false;
                    $scope.isLoading = false;
                    $scope.message = "Có lỗi xảy ra, vui lòng thử lại !"
                    alertShow();
                });
        }

        /**Xác nhận đơn hàng */
        $scope.updateStatusOrderNoDelivery = (order, index) => {
            var message = "Đơn hàng đã cập nhật thành công và chờ shipper giao!"
            order.status = "WAIT_FOR_THE_SHIPPER_TO_PICK_UP";
            updateStatusNoDelivery(order, message, index);
        }

        //tìm kiếm đơn hàng
        $scope.searchOrderNoDelivery = () => {
            $scope.isLoading = true;
            if ($scope.orderCode && $scope.orderCode.length > 1) {
                $http.get(apiOrder + "/searchOrderCodeAndStatus?orderCode=" + $scope.orderCode + "&orderStatus=NO_DELIVERY")
                    .then(response => {
                        $scope.isLoading = false;
                        $scope.orderNoDelivery = response.data;
                        $scope.orderNoDelivery.map(order => {
                            var totalMoney = 0;
                            if (order.orderDetails && order.orderDetails.length) {
                                order.orderDetails.forEach(orderDetail => {
                                    totalMoney += orderDetail.price * orderDetail.quantity;
                                })
                            }
                            if (order.voucher) {
                                totalMoney -= order.voucher.promotion;
                            }
                            order.totalMoney = totalMoney + order.totalShip;
                        })
                    })
                    .catch(error => {
                        console.log(error);
                        $scope.isLoading = false;
                        $scope.isSuccess = false;
                        $scope.message = "Có lỗi xảy ra, vui lòng thử lại"
                        alertShow();
                    })
            } else {
                getAllOrder(0, '');
            }
        }

        // tìm kiếm theo khoảng thời gian
        findByTimeNoDelivery = (beginDate, endDate) => {
            $scope.isLoading = true;
            $http.get(apiOrder + "/findByTimeAndStatus?beginDate=" + beginDate + "&endDate=" + endDate + "&status=NO_DELIVERY")
                .then(response => {
                    $scope.isLoading = false;
                    $scope.orderNoDelivery = response.data;
                    $scope.orderNoDelivery.map(order => {
                        var totalMoney = 0;
                        if (order.orderDetails && order.orderDetails.length) {
                            order.orderDetails.forEach(orderDetail => {
                                totalMoney += orderDetail.price * orderDetail.quantity;
                            })
                        }
                        if (order.voucher) {
                            totalMoney -= order.voucher.promotion;
                        }
                        order.totalMoney = totalMoney + order.totalShip;
                    })
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
        $scope.changeBeginDateNoDelivery = () => {
            $scope.beginDatea = $filter('date')($scope.beginDate, 'yyyy-MM-dd');
            if ($scope.endDatea) {
                findByTimeNoDelivery($scope.beginDatea + "", $scope.endDatea + "");
            }
        }

        // tìm kiếm theo khoảng thời gian
        $scope.changeEndDateNoDelivery = () => {
            $scope.endDatea = $filter('date')($scope.endDate, 'yyyy-MM-dd');
            if ($scope.beginDatea) {
                findByTimeWaitShipper($scope.beginDatea, $scope.endDatea);
            }
        }

        $scope.findByTotal = '';
        //tìm kiếm theo khoảng giá tổng tiền đơn hàng
        findBytotalNoDelivery = (beginMoney, endMoney) => {
            $http.get(apiOrder + "/totalMoneyAndStatus?beginMoney=" + beginMoney + "&endMoney=" + endMoney + "&status=NO_DELIVERY")
                .then(res => {
                    $scope.orderNoDelivery = res.data;
                    $scope.orderNoDelivery.map(order => {
                        var totalMoney = 0;
                        if (order.orderDetails && order.orderDetails.length) {
                            order.orderDetails.forEach(orderDetail => {
                                totalMoney += orderDetail.price * orderDetail.quantity;
                            })
                        }
                        if (order.voucher) {
                            totalMoney -= order.voucher.promotion;
                        }
                        order.totalMoney = totalMoney + order.totalShip;
                    })
                })
                .catch(err => {
                    console.log(err);
                    $scope.isSuccess = false;
                    $scope.message = "Có lỗi xảy ra khi lọc đơn hàng";
                    alertShow();
                })
        }
        $scope.findOrderByTotalMoneyNoDelivery = () => {
            if ($scope.findByTotal) {
                if ($scope.findByTotal == 1) {
                    //tìm các đơn hàng từ 0-> 1tr
                    findBytotalNoDelivery(0, 1000000);
                } else if ($scope.findByTotal == 2) {
                    //tìm các đơn hàng từ 1-> 3tr
                    findBytotalNoDelivery(1000000, 3000000);
                } else if ($scope.findByTotal == 3) {
                    //tìm các đơn hàng từ 3-> 5tr
                    findBytotalNoDelivery(3000000, 5000000);
                }
            }
            if ($scope.findByTotalBegin && $scope.findByTotalEnd) {
                findBytotalNoDelivery($scope.findByTotalBegin, $scope.findByTotalEnd);
            }
        }

        $scope.resetOrderNoDelivery = () => {
            $scope.beginDate = null;
            $scope.endDate = null;
            $scope.findByTotalBegin = $scope.findByTotalEnd = '';
            $scope.findByTotal = '';
            getAllOrderNoDelivery(0, $scope.status = "NO_DELIVERY");
        }
    }
    // end don hang by status NO_DELIVERY
    // start don hang by status CANCELLED
    {
        getAllOrderCanceled = (page, status) => {
            $scope.isLoading = true;
            $http.get(apiOrder + "/status" + "?page=" + page + "&status=" + status)
                .then(function (response) {
                    $scope.orderCanceled = response.data[0];
                    $scope.totalPage = response.data[1];
                    $scope.isLoading = false;
                    $scope.countCanceled = response.data[1];
                    $scope.orderCanceled.map(order => {
                        var totalMoney = 0;
                        if (order.orderDetails && order.orderDetails.length) {
                            order.orderDetails.forEach(orderDetail => {
                                totalMoney += orderDetail.price * orderDetail.quantity;
                            })
                        }
                        if (order.voucher) {
                            totalMoney -= order.voucher.promotion;
                        }
                        order.totalMoney = totalMoney + order.totalShip;
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
        getAllOrderCanceled(0, $scope.status = "CANCELLED");

        $scope.pageIndexCanceled = 0;
        $scope.prevCanceled = () => {
            if ($scope.pageIndexCanceled <= 0) {
                $scope.pageIndexCanceled = 0;
                getAllOrderCanceled(0, $scope.status = "CANCELLED");
            } else {
                $scope.pageIndexCanceled--;
                getAllOrderCanceled($scope.pageIndexCanceled, $scope.status = "CANCELLED");
            }
        }

        $scope.nextCanceled = () => {
            if ($scope.pageIndexCanceled == $scope.totalPage - 1) {
                $scope.pageIndexCanceled = $scope.totalPage - 1;
                getAllOrderCanceled($scope.totalPage - 1, $scope.status = "CANCELLED");
            } else {
                $scope.pageIndexCanceled++;
                getAllOrderCanceled($scope.pageIndexCanceled, $scope.status = "CANCELLED");
            }
        }

        //tìm kiếm đơn hàng
        $scope.searchOrderCanceled = () => {
            $scope.isLoading = true;
            if ($scope.orderCode && $scope.orderCode.length > 1) {
                $http.get(apiOrder + "/searchOrderCodeAndStatus?orderCode=" + $scope.orderCode + "&orderStatus=CANCELLED")
                    .then(response => {
                        $scope.isLoading = false;
                        $scope.orderCanceled = response.data;
                        $scope.orderCanceled.map(order => {
                            var totalMoney = 0;
                            if (order.orderDetails && order.orderDetails.length) {
                                order.orderDetails.forEach(orderDetail => {
                                    totalMoney += orderDetail.price * orderDetail.quantity;
                                })
                            }
                            if (order.voucher) {
                                totalMoney -= order.voucher.promotion;
                            }
                            order.totalMoney = totalMoney + order.totalShip;
                        })
                    })
                    .catch(error => {
                        console.log(error);
                        $scope.isLoading = false;
                        $scope.isSuccess = false;
                        $scope.message = "Có lỗi xảy ra, vui lòng thử lại"
                        alertShow();
                    })
            } else {
                getAllOrder(0, '');
            }
        }

        // tìm kiếm theo khoảng thời gian
        findByTimeCanceled = (beginDate, endDate) => {
            $scope.isLoading = true;
            $http.get(apiOrder + "/findByTimeAndStatus?beginDate=" + beginDate + "&endDate=" + endDate + "&status=CANCELLED")
                .then(response => {
                    $scope.isLoading = false;
                    $scope.orderCanceled = response.data;
                    $scope.orderCanceled.map(order => {
                        var totalMoney = 0;
                        if (order.orderDetails && order.orderDetails.length) {
                            order.orderDetails.forEach(orderDetail => {
                                totalMoney += orderDetail.price * orderDetail.quantity;
                            })
                        }
                        if (order.voucher) {
                            totalMoney -= order.voucher.promotion;
                        }
                        order.totalMoney = totalMoney + order.totalShip;
                    })
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
        $scope.changeBeginDateCanceled = () => {
            $scope.beginDatea = $filter('date')($scope.beginDate, 'yyyy-MM-dd');
            if ($scope.endDatea) {
                findByTimeCanceled($scope.beginDatea + "", $scope.endDatea + "");
            }
        }

        // tìm kiếm theo khoảng thời gian
        $scope.changeEndDateCanceled = () => {
            $scope.endDatea = $filter('date')($scope.endDate, 'yyyy-MM-dd');
            if ($scope.beginDatea) {
                findByTimeWaitShipper($scope.beginDatea, $scope.endDatea);
            }
        }

        $scope.findByTotal = '';
        //tìm kiếm theo khoảng giá tổng tiền đơn hàng
        findBytotalCanceled = (beginMoney, endMoney) => {
            $http.get(apiOrder + "/totalMoneyAndStatus?beginMoney=" + beginMoney + "&endMoney=" + endMoney + "&status=CANCELLED")
                .then(res => {
                    $scope.orderCanceled = res.data;
                    $scope.orderCanceled.map(order => {
                        var totalMoney = 0;
                        if (order.orderDetails && order.orderDetails.length) {
                            order.orderDetails.forEach(orderDetail => {
                                totalMoney += orderDetail.price * orderDetail.quantity;
                            })
                        }
                        if (order.voucher) {
                            totalMoney -= order.voucher.promotion;
                        }
                        order.totalMoney = totalMoney + order.totalShip;
                    })
                })
                .catch(err => {
                    console.log(err);
                    $scope.isSuccess = false;
                    $scope.message = "Có lỗi xảy ra khi lọc đơn hàng";
                    alertShow();
                })
        }
        $scope.findOrderByTotalMoneyCanceled = () => {
            if ($scope.findByTotal) {
                if ($scope.findByTotal == 1) {
                    //tìm các đơn hàng từ 0-> 1tr
                    findBytotalCanceled(0, 1000000);
                } else if ($scope.findByTotal == 2) {
                    //tìm các đơn hàng từ 1-> 3tr
                    findBytotalCanceled(1000000, 3000000);
                } else if ($scope.findByTotal == 3) {
                    //tìm các đơn hàng từ 3-> 5tr
                    findBytotalCanceled(3000000, 5000000);
                }
            }
            if ($scope.findByTotalBegin && $scope.findByTotalEnd) {
                findBytotalCanceled($scope.findByTotalBegin, $scope.findByTotalEnd);
            }
        }

        $scope.resetOrderCanceled = () => {
            $scope.beginDate = null;
            $scope.endDate = null;
            $scope.findByTotalBegin = $scope.findByTotalEnd = '';
            $scope.findByTotal = '';
            getAllOrderCanceled(0, $scope.status = "CANCELLED");
        }
    }
    // end don hang by status CANCELLED

    // start đổi trả hàng
    {
        getAllOrderReturn = (status) => {
            $scope.isLoading = true;
            $http.get(apiOrder + "/return_order" + "?status=" + status)
                .then(function (response) {
                    $scope.orderRe = response.data;
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
        getAllOrderReturn($scope.statusReturn);

        /**chọn tab các đơn đã xử lý */
        $scope.activeTrue = () => {
            $scope.active = true;
            $scope.statusReturn = "DONE";
            getAllOrderReturn($scope.statusReturn);
        }

        /**chọn tab các đơn chờ */
        $scope.activeFalse = () => {
            $scope.active = false;
            $scope.statusReturn = "WAIT";
            getAllOrderReturn($scope.statusReturn);
        }

        $scope.orderReturn = null; //hien thi len modal doi tra
        $scope.orderSearchIndex = '';
        $scope.chooseOrderReturn = (order, indexOrder) => {
            $scope.orderReturn = order;
            if (order.orderHistories && order.orderHistories[0].status == "WAIT") {
                $scope.orderReturnHistory = order.orderHistories;
            } else {
                $scope.orderReturnHistory = [];
            }
            $scope.orderSearchIndex = indexOrder;
            var myModal = new bootstrap.Modal(document.getElementById('modalReturnOrder'), {
                keyboard: false
            })
            myModal.show()
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

            if (result.length > 0) {
                angular.copy($scope.orderReturnHistory).map((item, index) => {
                    if (item.orderDetail.id == a.orderDetail.id && item.action == a.action) {
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

            if (result.length == 0) {
                $scope.orderReturnHistory.push(angular.copy(a));
            } else {
                $scope.orderReturnHistory.map((item, index) => {
                    if (item.orderDetail.id == a.orderDetail.id && a.action == item.action) {
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
            if (result.length > 0) {
                angular.copy($scope.orderReturnHistory).map((item, index) => {
                    if (item.orderDetail.id == a.orderDetail.id && a.action == item.action) {
                        $scope.orderReturnHistory[index].quantity += $scope.orderReturnWaitQuantityReturn;
                    }
                });
            } else {
                $scope.orderReturnHistory.push(angular.copy(a));
            }

            if ($scope.orderReturn.orderDetails[$scope.indexProductInOrderDetail].quantity == 0) {
                $scope.orderReturn.orderDetails.splice($scope.indexProductInOrderDetail, 1);
                $scope.orderReturnHistory.map((item, index) => {
                    if (item.orderDetail.id == a.orderDetail.id && item.action == "DOI") {
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
                if (item.action == "DOI" && item.orderDetail.id == a.orderDetail.id) {
                    $scope.orderReturnHistory.splice(index, 1);
                }
            })

            const result = $scope.orderReturnHistory.filter((item) => {
                return item.orderDetail.id == a.orderDetail.id;
            })

            if (result.length == 0) {
                $scope.orderReturn.orderDetails.splice($scope.indexProductInOrderDetail, 1);
                $scope.orderReturnHistory.push(angular.copy(a));
            } else {
                $scope.orderReturnHistory.map((item, index) => {

                    if (item.orderDetail.id == a.orderDetail.id) {
                        var quantity = 0;
                        if (item.action === "TRA" || item.action === "TRA_ALL") {
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
            $scope.orderReturn = $scope.orderSearch[$scope.orderSearchIndex];
        }

        /**cập nhật đổi, trả hàng vào database */
        updateOrderReturn = (orderReturn, message, index) => {
            for (var j = 0; j < orderReturn.orderHistories.length; j++) {
                const item = orderReturn.orderHistories[j];
                orderReturn.orderHistories[j].status = "DONE";
                var result = false;
                for (var i = 0; i < orderReturn.orderDetails.length; i++) {
                    if (item.orderDetail.id == orderReturn.orderDetails[i].id) {
                        if (item.action != "DOI") {
                            orderReturn.orderDetails[i].quantity -= item.quantity;
                        }
                        result = true;
                        break;
                    } else {
                        result = false;
                    }
                }
                if (result == true) {
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
        //xác nhận yêu cầu đổi trả hàng
        $scope.updateReturnOrder = () => {
            $scope.orderReturn.orderHistories = $scope.orderReturnHistory;
            $scope.orderReturn.orderHistories[0].description = $scope.reasonReturn || $scope.orderReturn.orderHistories[0].description;
            $scope.isLoading = true;
            const message = "Đổi trả hàng thành công";
            const index = $scope.orderSearchIndex;
            updateOrderReturn($scope.orderReturn, message, index);
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
                    $scope.orderRe.splice(index, 1);
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
            if (boolean) {
                const a = $scope.orderReturnHistory.splice($scope.index, 1);
                if ($scope.orderReturn.orderDetails[$scope.indexProductInOrderDetail]) {
                    $scope.orderReturn.orderDetails[$scope.indexProductInOrderDetail].quantity += a[0].quantity;
                } else {
                    $scope.orderReturn.orderDetails[$scope.indexProductInOrderDetail] = a[0];
                }
            }
        }
        $scope.deleteProductInReturnOrder = () => {
            $http.delete("http://localhost:8080/n3t/orderReturn/" + $scope.idOrderReturn)
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
    }
    // end đổi trả hàng

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
        if ($scope.listOrder[orderNo].orderDetails[productIndex].product.name) {
            getAllProduct(apiProduct + "/get-by-name?name=" + $scope.listOrder[orderNo].orderDetails[productIndex].product.name);
        } else {
            $scope.productName = "";
            getAllProduct(apiProduct);
        }
    }

    /**chon san pham trong danh sach, param: vị tri product, vi tri productDetail, vi tri order hien tai */
    $scope.chooseProduct = (product, productDetail, indexOrder) => {
        var indexProduct = null;
        var result = $scope.orders[indexOrder].orderDetails.filter((item, index) => {
            if (item.id == productDetail.id) {
                indexProduct = index;
            }
            return productDetail.id === item.productDetail.id;
        })

        if (result.length == 0) {
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
        if (order.voucher) {
            $scope.totalMoney -= order.voucher.promotion;
        }
    }

    /**thay doi so luong san pham */
    $scope.changeQuantity = (indexOrder, index) => {

        const idProductDetail = $scope.orders[indexOrder].orderDetails[index].productDetail.id;
        const quantityProduct = $scope.orders[indexOrder].orderDetails[index].quantity;

        $http.get("http://localhost:8080/n3t/product/detail/check-quantity/" + idProductDetail + "?quantity=" + Number(quantityProduct))
            .then(res => {
                if (res.data[1] == false) {
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
        const productDetailId = $scope.orders[$scope.indexOrder].orderDetails[$scope.indexOrderDetail].id;

        $http.delete("http://localhost:8080/n3t/order/detail/" + productDetailId)
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
    $scope.chooseProvince = function (ProvinceID, indexOrder) {
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
                if ($scope.orders[indexOrder].province == "Hà Nội") {
                    $scope.listDistrict.splice(0, 2);
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    // chon quan, huyện
    $scope.chooseDistrict = function (DistrictID, indexOrder) {
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
    $scope.chooseWard = function (WardCode, indexOrder) {
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
                if (response.data.status == "WAIT_FOR_THE_SHIPPER_TO_PICK_UP" && !response.data.codeGHN) {

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
                        if (response.data.paymentType == "OFFLINE") {
                            cod_amount = cod_amount + (item.price * item.quantity);
                            payment_type_id = 2;
                        } else {
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

                            if ($scope.orders[indexOrder].codeGHN) {
                                $http.post(apiOrder, $scope.orders[indexOrder])
                                    .then(response => { })
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

                } else {
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

        if (province.ProvinceID) {
            $http({
                method: 'POST',
                url: "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district",
                headers: {
                    Token: '8572ee07-c663-11ed-ab31-3eeb4194879e',
                },
                data: { province_id: Number(province.ProvinceID) },
            })
                .then(function (response) {
                    $scope.listDistrict = response.data.data;

                    const district = $scope.listDistrict.find(item => {
                        return item.DistrictName == $scope.orders[indexOrder].district;
                    })

                    if (district.DistrictID) {
                        $http({
                            method: 'POST',
                            url: "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward",
                            headers: {
                                Token: '8572ee07-c663-11ed-ab31-3eeb4194879e',
                            },
                            data: { district_id: Number(district.DistrictID) }
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

    //tìm kiếm đơn hàng
    $scope.searchOrder = () => {
        $scope.isLoading = true;
        if ($scope.orderCode && $scope.orderCode.length > 1) {
            $http.get(apiOrder + "/search?orderCode=" + $scope.orderCode)
                .then(response => {
                    $scope.isLoading = false;
                    // $scope.orderSearch = response.data;
                    $scope.orders = response.data;
                    $scope.orders.map(order => {
                        var totalMoney = 0;
                        if (order.orderDetails && order.orderDetails.length) {
                            order.orderDetails.forEach(orderDetail => {
                                totalMoney += orderDetail.price * orderDetail.quantity;
                            })
                        }
                        if (order.voucher) {
                            totalMoney -= order.voucher.promotion;
                        }
                        order.totalMoney = totalMoney + order.totalShip;
                    })
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
                $scope.orders.map(order => {
                    var totalMoney = 0;
                    if (order.orderDetails && order.orderDetails.length) {
                        order.orderDetails.forEach(orderDetail => {
                            totalMoney += orderDetail.price * orderDetail.quantity;
                        })
                    }
                    if (order.voucher) {
                        totalMoney -= order.voucher.promotion;
                    }
                    order.totalMoney = totalMoney + order.totalShip;
                })
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
        if ($scope.endDatea) {
            findByTime($scope.beginDatea + "", $scope.endDatea + "");
        }
    }

    // tìm kiếm theo khoảng thời gian
    $scope.changeEndDate = () => {
        $scope.endDatea = $filter('date')($scope.endDate, 'yyyy-MM-dd');
        if ($scope.beginDatea) {
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
                    if (order.orderDetails && order.orderDetails.length) {
                        order.orderDetails.forEach(orderDetail => {
                            totalMoney += orderDetail.price * orderDetail.quantity;
                        })
                    }
                    if (order.voucher) {
                        totalMoney -= order.voucher.promotion;
                    }
                    order.totalMoney = totalMoney + order.totalShip;
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
        if ($scope.findByTotal) {
            if ($scope.findByTotal == 1) {
                //tìm các đơn hàng từ 0-> 1tr
                findBytotal(0, 1000000);
            } else if ($scope.findByTotal == 2) {
                //tìm các đơn hàng từ 1-> 3tr
                findBytotal(1000000, 3000000);
            } else if ($scope.findByTotal == 3) {
                //tìm các đơn hàng từ 3-> 5tr
                findBytotal(3000000, 5000000);
            }
        }
        if ($scope.findByTotalBegin && $scope.findByTotalEnd) {
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