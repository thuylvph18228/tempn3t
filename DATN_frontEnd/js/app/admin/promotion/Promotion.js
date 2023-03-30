function promotion ($scope, $http, $rootScope) {
    
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

    $scope.promotion = {
        id: '',
        name: '',
        quantity: '',
        beginDate: new Date(),
        endDate: new Date(),
        status: 'AVAILABLE',
    }

    $scope.voucher = {
        id: '',
        name: '',
        code: '',
        minMoney: '',
        beginDate: new Date(),
        endDate: new Date(),
        promotion: '',
        quantity: '',
        status: 'AVAILABLE',
        isDelete: 0
    }

    $scope.promotions = [];
    $scope.vouchers = [];

    $scope.isLoading = false;
    $scope.isSuccess = true;
    $scope.message = "";

    const apiPromotion = "http://localhost:8080/laclac/promotion"
    const apiVoucher = "http://localhost:8080/laclac/voucher"

    /**hien thi thong bao */
    alertShow = () => {
        $(document).ready(function(){
            $('.toast').toast('show');
        });
    }

    $scope.isLoading = true;
    //get all promotion
    $http.get(apiPromotion)
        .then((res) => {
            $scope.promotions = res.data;
            $scope.isLoading = false;
        }).catch((err) => {
            console.log(err);
            $scope.isLoading = false;
            $scope.isSuccess = false;
            $scope.message = "Có lỗi xảy ra, vui lòng thử lại!!!";
            alertShow();
        });

    // save promotion
    $scope.savePromotion = () => {
        $http.post(apiPromotion, $scope.promotion)
            .then(res => {
                $scope.promotions.push(angular.copy(res.data));
                $scope.isLoading = false;
                $scope.isSuccess = true;
                $scope.message = "Tạo khuyến mãi thành công";
            })
            .catch(err => {
                console.log(err);
                $scope.isLoading = false;
                $scope.isSuccess = false;
                $scope.message = "Có lỗi xảy ra khi tạo khuyến mãi";
            })
        alertShow();
    }

    //get all voucher
    $http.get(apiVoucher)
        .then((res) => {
            $scope.vouchers = res.data;
            $scope.isLoading = false;
        }).catch((err) => {
            console.log(err);
            $scope.isLoading = false;
            $scope.isSuccess = false;
            $scope.message = "Có lỗi xảy ra, vui lòng thử lại!!!";
            alertShow();
        });

    // save voucher
    $scope.saveVoucher = () => {
        $http.post(apiVoucher, $scope.voucher)
            .then(res => {
                if(!$scope.voucher.id){
                    $scope.vouchers.push(angular.copy(res.data));
                }
                $scope.isLoading = false;
                $scope.isSuccess = true;
                $scope.message = "Lưu voucher thành công";
                $scope.clearVoucher();
            })
            .catch(err => {
                console.log(err);
                $scope.isLoading = false;
                $scope.isSuccess = false;
                $scope.message = "Có lỗi xảy ra khi lưu voucher";
            })
        alertShow();
    }

    $scope.clearVoucher = () => {
        $scope.voucher = {
            id: '',
            name: '',
            code: '',
            minMoney: '',
            beginDate: new Date(),
            endDate: new Date(),
            promotion: '',
            quantity: '',
            status: 'AVAILABLE',
            isDelete: 0
        }
    }

    $scope.checkEndDate = ( voucher) => {
        if(new Date(voucher.endDate).getTime() <= new Date().getTime()){
            return true;
        } else {
            return false;
        }
    }

    $scope.editVoucher = (index) => {
        $scope.voucher = angular.copy($scope.vouchers[index]);
        $scope.voucher.beginDate = new Date(angular.copy($scope.vouchers[index]).beginDate);
        $scope.voucher.endDate = new Date(angular.copy($scope.vouchers[index]).endDate);
    }

    $scope.updateStatusVoucher = (voucher, index) => {
        if(voucher.status == 'AVAILABLE'){
            voucher.status = "UNAVAILABLE";
        } else {
            voucher.status = "AVAILABLE"
        }

        $http.post(apiVoucher, voucher)
            .then(res => {
                $scope.isLoading = false;
                $scope.isSuccess = true;
                $scope.message = "Đã cập nhật trạng thái";
            })
            .catch(err => {
                console.log(err);
                $scope.isLoading = false;
                $scope.isSuccess = false;
                $scope.message = "Có lỗi xảy ra khi cập nhật voucher";
            })
        alertShow();
    }

    $scope.deleteVoucher = (index, voucher) => {
        $http.put(apiVoucher, voucher)
            .then(res => {
                $scope.vouchers.splice(index, 1);
                $scope.isSuccess = true;
                $scope.message = "Đã xóa voucher"
            })
            .catch(err => {
                console.log(err);
                $scope.isSuccess = false;
                $scope.message = "Có lỗi xảy ra !!!"
            })
        alertShow();
    }
    
}