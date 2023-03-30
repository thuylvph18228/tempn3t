function returnOrder ($scope, $http, $rootScope){
    
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
    $scope.status = "WAIT";

    $scope.isLoading = false;
    $scope.isSuccess = true;
    $scope.message = ""
    $scope.pageIndex = 0;
    $scope.totalPage = '';
    $scope.active = false;

    const apiOrder = 'http://localhost:8080/laclac/order';
    const apiProduct = 'http://localhost:8080/laclac/product';

    /**hien thi thong bao */
    alertShow = () => {
        $(document).ready(function(){
            $('.toast').toast('show');
        });
    }

    //get all don hang by status orderHistory
    getAllOrderByStatus = (status) => {
        $scope.orders = [];
        $scope.isLoading = true;
        $http.get(apiOrder + "/return_order" + "?status=" + status) 
            .then(function (response) {                    
                $scope.orders = response.data;
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
    getAllOrderByStatus($scope.status);

    //get all don hang 
    getAllOrder = () => {
        $scope.isLoading = true;
        $http.get(apiOrder) 
            .then(function (response) {                    
                $scope.orderSearch = response.data[0];
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

    $scope.prev = () => {
        // if($scope.pageIndex <= 0) {
        //     $scope.pageIndex  = 0;
        //     getAllOrderByStatus(0, $scope.status);
        // } else {
        //     $scope.pageIndex--;
        //     getAllOrderByStatus($scope.pageIndex, $scope.status);
        // }
    }

    $scope.next = () => {
        // if($scope.pageIndex == $scope.totalPage - 1) {
        //     $scope.pageIndex = $scope.totalPage - 1;
        //     getAllOrderByStatus($scope.totalPage - 1, $scope.status);
        // } else {
        //     $scope.pageIndex++;
        //     getAllOrderByStatus($scope.pageIndex, $scope.status);
        // }
    }

    /**chọn tab các đơn đã xử lý */
    $scope.activeTrue = () => {
        $scope.active = true;
        $scope.status = "DONE";
        getAllOrderByStatus($scope.status);
    }

    /**chọn tab các đơn chờ */
    $scope.activeFalse = () => {
        $scope.active = false;
        $scope.status = "WAIT";
        getAllOrderByStatus($scope.status);
    }

    $scope.orderCode = '';
    $scope.orderSearch = [];
    
    /**tim kiem order theo mã, tên kh, sdt */
    searchOrder = (orderCode) => {
        $scope.isLoading = true;
        $http.get(apiOrder + "/search?orderCode=" + orderCode)
            .then(response => {
                $scope.isLoading = false;
                $scope.orderSearch = response.data;
                console.log($scope.orderSearch);
            })
            .catch(error => {
                console.log(error);
                $scope.isLoading = false;
                $scope.isSuccess = false;
                $scope.message = "Có lỗi xảy ra, vui lòng thử lại"
                alertShow();
            })

    }

    $scope.searchOrder = () => {
        if($scope.orderCode) {
            searchOrder($scope.orderCode);
        } else {
            getAllOrder();
        }
    }

    $scope.showAllOrder = () => {
        getAllOrder();
    }

    $scope.orderReturn = null; //hien thi len modal doi tra
    $scope.orderSearchIndex = '';
    $scope.chooseOrder = (order, indexOrder) => {
        $scope.orderReturn = order;
        if(order.orderHistories && order.orderHistories[0].status == "WAIT" ){
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
        $scope.orderReturn = $scope.orderSearch[$scope.orderSearchIndex];
    }

    /**cập nhật đổi, trả hàng vào database */
    updateOrderReturn = (orderReturn, message, index) => {

        orderReturn.orderHistories.map(item => {
            item.status = "DONE";
            orderReturn.orderDetails.map(orderDetail => {
                if(item.orderDetail.id == orderDetail.id && item.action != "DOI"){
                    orderDetail.quantity -= item.quantity;
                }
            })
        });

        $http.post(apiOrder + "/returnOrder", orderReturn)
            .then(response => {
                $scope.orders.splice(index, 1);
                $scope.isLoading = false;
                $scope.isSuccess = true;
                $scope.message = message;
                alertShow();
                getAllOrderByStatus("WAIT");
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
        $scope.orderReturn.orderHistories[0].description = $scope.reasonReturn;
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
    $scope.chooseProductInReturnOrder = (index) => {
        $scope.idOrderReturn = $scope.orderReturnHistory[index].id;
        $scope.index = index;
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

}