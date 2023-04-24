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
        isDelete: 0
    }
    
    $scope.promotionCategory = {
        id: '',
        promotion: 5,
        category: 3
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

    const apiPromotion = "http://localhost:8080/n3t/promotion"
    const apiVoucher = "http://localhost:8080/n3t/voucher"
    const apiCategory = "http://localhost:8080/n3t/category"
    const apiPromotionCategory = "http://localhost:8080/n3t/promotion-category"
    
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
                if(!$scope.promotion.id){
                    $scope.promotions.push(angular.copy(res.data));
                }
                $scope.isLoading = true;
                $scope.isSuccess = true;
                $scope.message = "Lưu khuyến mãi thành công";
                $scope.clearPromotion();
            })
            .catch(err => {
                console.log(err);
                $scope.isLoading = false;
                $scope.isSuccess = false;
                $scope.message = "Có lỗi xảy ra khi tạo khuyến mãi";
            })
        alertShow();
    }

    $scope.clearPromotion = () => {
        $scope.promotion = {
            id: '',
            name: '',
            quantity: '',
            beginDate: new Date(),
            endDate: new Date(),
            status: 'AVAILABLE',
            isDelete: 0
        }
    }

    $scope.checkEndDatePromotion = (promotion) => {
        if(new Date(promotion.endDate).getTime() <= new Date().getTime()){
            return true;
        } else {
            return false;
        }
    }

    $scope.updateStatusPromotion = (promotion, index) => {
        if(promotion.status == 'AVAILABLE'){
            promotion.status = "UNAVAILABLE";
        } else {
            promotion.status = "AVAILABLE"
        }

        $http.post(apiPromotion, promotion)
            .then(res => {
                $scope.isLoading = true;
                $scope.isSuccess = true;
                $scope.message = "Đã cập nhật trạng thái";
            })
            .catch(err => {
                console.log(err);
                $scope.isLoading = false;
                $scope.isSuccess = false;
                $scope.message = "Có lỗi xảy ra khi cập nhật promotion";
            })
        alertShow();
    }

    $scope.editPromotion = (index) => {
        $scope.promotion = angular.copy($scope.promotions[index]);
        $scope.promotion.beginDate = new Date(angular.copy($scope.promotions[index]).beginDate);
        $scope.promotion.endDate = new Date(angular.copy($scope.promotions[index]).endDate);
    }

    $scope.deletePromotion = (index, promotion) => {
        $http.put(apiPromotion, promotion)
            .then(res => {
                $scope.promotions.splice(index, 1);
                $scope.isSuccess = true;
                $scope.message = "Đã xóa promotion"
            })
            .catch(err => {
                console.log(err);
                $scope.isSuccess = false;
                $scope.message = "Có lỗi xảy ra !!!"
            })
        alertShow();
    }

    //get all category
    $http.get(apiCategory)
        .then((res) => {
            $scope.listCategory = res.data;
            $scope.isLoading = false;
        }).catch((err) => {
            console.log(err);
            $scope.isLoading = false;
            $scope.isSuccess = false;
            $scope.message = "Có lỗi xảy ra, vui lòng thử lại!!!";
            alertShow();
        });

    $scope.selectedCategorys = [];

    $scope.toggleAllSelection = function () {
        if ($scope.selectAll) {
            $scope.selectedCategorys = $scope.listCategory.slice();
            angular.forEach($scope.listCategory, function(category) {
                category.selected = true;
            });
        } else {
            $scope.selectedCategorys = [];
            angular.forEach($scope.listCategory, function(category) {
                category.selected = false;
            });
        }
        // Check if any product is not selected
        var anyUnselectedProduct = $scope.listCategory.some(function (category) {
            return !category.selected;
        });

        // Update selectAll checkbox
        $scope.selectAll = !anyUnselectedProduct;
    };

    $scope.toggleSelection = function (index) {
        var category = $scope.listCategory[index];
        var cateIndex = $scope.selectedCategorys.indexOf(category);
        if (cateIndex > -1) {
            $scope.selectedCategorys.splice(cateIndex, 1);
        } else {
            $scope.selectedCategorys.push(category);
        }
    };

    $scope.getSelectedCategorys = function () {
        return $scope.selectedCategorys
            .map(function (category) {
                return category.name;
            });
    };

    $scope.checkAll = function () {
        $scope.isCheckedAll = true;
        angular.forEach($scope.listCategory, function (category) {
            category.selected = true;
        });
    };

    $scope.uncheckAll = function () {
        $scope.isCheckedAll = false;
        angular.forEach($scope.listCategory, function (category) {
            category.selected = false;
        });
    };

    $scope.$watch('listCategory', function () {
        var allSelected = true;
        angular.forEach($scope.listCategory, function (category) {
            if (!category.selected) {
                allSelected = false;
            }
        });
        $scope.isCheckedAll = allSelected;
    }, true);

    $scope.idCates = [];
    $scope.confirm = (index, promotion) => {
        // $scope.promotionCategory.promotion = promotion.id;
        // $scope.idCates = angular.copy($scope.selectedCategorys).map(function(proCate){
        //     return proCate.id;
        // });
        // $scope.promotionCategory.category = 3;

        console.log($scope.promotionCategory);
        $http.post(apiPromotionCategory, $scope.promotionCategory)
            .then(function (response) {
                $scope.isLoading = true;
                $scope.isSuccess = true;
                $scope.message = "Thành công"
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

    $scope.checkEndDate = (voucher) => {
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