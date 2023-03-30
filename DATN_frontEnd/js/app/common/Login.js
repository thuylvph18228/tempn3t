function login ($scope, $http, jwtHelper, $rootScope) {
    
    $scope.user = {
        username: '',
        password: ''
    }
    $rootScope.isAdmin = false;

    $scope.isLoading = false;
    $scope.isSuccess = true;
    $scope.message = "";

    const apiUser = "http://localhost:8080/laclac/user"

    /**hien thi thong bao */
    alertShow = () => {
        $(document).ready(function(){
            $('.toast').toast('show');
        });
    }

    /**dang nhap */
    $scope.login = () => {
        $scope.isLoading = true;
        
        $http.post("http://localhost:8080/auth/login", $scope.user)
        .then(response => {
                $scope.isLoading = false;
                $scope.isSuccess = true;
                $scope.message = "Đăng nhập thành công";
                const token = response.headers("x-auth-token");
                const tokenPayload = jwtHelper.decodeToken(token);
                const user = {
                    username: tokenPayload.username,
                    roles: tokenPayload.roles
                };

                user.roles.map(item => {
                    if(item == "ADMIN") {
                        $rootScope.isAdmin = true;
                    }
                })

                $rootScope.isLogin = true;

                $http.get(apiUser + "/get-by-username?username=" + user.username)
                    .then(res => {
                        $rootScope.user = res.data;
                    })
                    .catch(err => {
                        console.log(err);
                    })
                $rootScope.user = user;

                const userJson = JSON.stringify(angular.copy(user));

                const isTokenExpired = jwtHelper.isTokenExpired(token);
                if(isTokenExpired == false){
                    localStorage.setItem("x-auth-token", token);
                    localStorage.setItem("user", userJson);
                } else {
                    $scope.message = "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại";
                }
                // alertShow();
                if($rootScope.isAdmin == false){
                    document.location.href = "#home";
                } else {
                    document.location.href = "#admin-dashboard";
                }
            })
            .catch(error => {
                console.log(error);
                $scope.isLoading = false;
                $scope.isSuccess = false;
                $scope.message = "Sai thông tin đăng nhập!!!";
                alertShow();
            })

        $scope.isLoading = false;
    }

    $scope.sendMail = () => {
        $http.get(apiUser + "/forgot-password?email=" + $scope.email)
            .then(res => {
                $scope.userDTO = res.data[0];
                if(res.data[1]){
                    $scope.message = "Mã xác nhận đã được gửi đến email của bạn";
                    $scope.isSuccess = true;
                    localStorage.setItem("codeChangePass", res.data[1]);
                    alertShow();
                } else {
                    $scope.message = "Email không tồn tại";
                    $scope.isSuccess = false;
                    alertShow();
                }
            })
            .catch(err => {
                $scope.message = "Có lỗi xảy ra vui lòng thử lại";
                $scope.isSuccess = false;
                alertShow();
            })
        
    }

    $scope.openModelChangePass = () => {
        const codeChangePass = localStorage.getItem("codeChangePass");
        if(codeChangePass === $scope.codeChangePass){
            $('#forgotPasswordModal').modal('hide');
            $('#modalChangePass').modal('show');
        } else {
            $scope.message = "Mã xác nhận không đúng";
            $scope.isSuccess = false;
            alertShow();
        }
    }

    $scope.changePassword = () => {
        $http.put(apiUser + "/change-password", $scope.userDTO)
            .then(res => {
                if(res.data){
                    $scope.message = "Đổi mật khẩu thành công";
                    $scope.isSuccess = true;
                    localStorage.removeItem("codeChangePass");
                    $('#modalChangePass').modal('hide');
                    alertShow();
                }
            })
            .catch(err => {
                $scope.message = "Có lỗi xảy ra, vui lòng thử lại sau";
                $scope.isSuccess = false;
                alertShow();
            })
    }
}