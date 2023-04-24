function promotionDetail($scope, $http, $rootScope) {

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

    $scope.listCategory = [];

    /**hien thi thong bao */
    alertShow = () => {
        $(document).ready(function () {
            $('.toast').toast('show');
        });
    }

    const apiCategory = "http://localhost:8080/n3t/category";
    $scope.isLoading = true;

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
            angular.forEach($scope.listCategory, function (category) {
                category.selected = true;
            });
        } else {
            $scope.selectedCategorys = [];
            angular.forEach($scope.listCategory, function (category) {
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

    $scope.confirm = () => {
        
    }
}