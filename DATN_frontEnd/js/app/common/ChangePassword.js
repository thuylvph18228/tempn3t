function changePassword ($scope, $http) {
    
    const userLocal = localStorage.getItem("user");
    const user = userLocal ? JSON.parse(userLocal) : null;
    
    $scope.user = {};
    $scope.isSuccess = true;
    $scope.isLoading = true;  

    const apiUser = 'http://localhost:8080/laclac/user';

    /**hien thi thong bao */
    alertShow = () => {
        $(document).ready(function(){
            $('.toast').toast('show');
        });
    }

    /**lay thong tin user đăng nhập */
    getInfoUser = () => {
        $scope.isLoading = true;
        if(user){
            $http.get(apiUser + "/get-by-username?username=" + user.username) 
                .then(response => {                    
                    $scope.user = response.data;
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

    $scope.changePassword = () => {
        $http.get(apiUser + "/compare-password?password=" + $scope.passwordOld) 
            .then(response => {                    
                if(response.data == true){
                    $scope.user.password = $scope.passwordNew;
                    //đổi mật khẩu
                    $http.put(apiUser + "/change-password", $scope.user)
                        .then(res => {
                            if(res.data){
                                $scope.message = "Đổi mật khẩu thành công";
                                $scope.isSuccess = true;
                                alertShow();
                            }
                        })
                        .catch(err => {
                            $scope.message = "Có lỗi xảy ra, vui lòng thử lại sau";
                            $scope.isSuccess = false;
                            alertShow();
                        })
                } else{
                    $scope.message = "Mật khẩu cũ không đúng";
                    $scope.isSuccess = false;
                    alertShow();
                }
            })
            .catch(error => {
                console.log(error);
                $scope.isSuccess = false;
                $scope.message = "Có lỗi xảy ra, vui lòng thử lại";
                alertShow();
            });

    }

    $scope.cancel = () => {
        document.location.href = "#home";
    }
    
}