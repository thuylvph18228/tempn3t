function promotionDetail ($scope, $http, $rootScope) {
    
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

    $scope.productList = []; 

    /**hien thi thong bao */
    alertShow = () => {
        $(document).ready(function () {
            $('.toast').toast('show');
        });
    }

    const api = 'http://localhost:8080/n3t/product';
    $scope.isLoading = true;

    /**get all product */
    getAllProduct = (api, page, size) => {
        $http.get(api + "/index" + "?page=" + page + "&size=" + size)
            .then(function (response) {
                $scope.products = response.data[0];
                $scope.products.forEach((element, index) => {
                    // element.index = index + 1;
                    element.quantity = 0;
                    element.sold = 0;
                    element.productDetails.forEach(item => {
                        element.quantity += Number(item.quantity);
                        item.orderDetail.forEach(orderDetail => {
                            element.sold += Number(orderDetail.quantity);

                        })
                    })
                });
                if (response.data[2] && response.data[2] != null) {
                    $scope.totalProduct = response.data[2];
                }
                $scope.productList = $scope.products;
                $scope.count = response.data[1];
                $scope.isLoading = false;
            })
            .catch(function (error) {
                console.log(error);
                $scope.isLoading = false;
            });
    }
    getAllProduct(api, 0, 10);

    $scope.page = {
        page: 0,
        size: 10,
    }

    /**phan trang */
    function pageging() {
        getAllProduct(api, $scope.page.page, $scope.page.size);
        $scope.productsList = $scope.products;
    }

    /**trang phia truoc */
    $scope.prev = function () {
        $scope.page.page--;
        if ($scope.page.page < 0) {
            $scope.page.page = $scope.count - 1;
        }
        pageging();
    }
    /**trang tiep theo */
    $scope.next = function () {
        ++$scope.page.page;
        if ($scope.page.page >= $scope.count) {
            $scope.page.page = 0;
        }
        pageging();
    }
    /**thay doi trong input */
    $scope.changePage = () => {
        if ($scope.page.page <= 0 || null || $scope.page.page == undefined) {
            $scope.page.page = 0;
        }
        if ($scope.page.page > $scope.count) {
            $scope.page.page = $scope.count - 1;
        }
        // pageging();
    }
}