function register ($scope, $http) {
    $scope.register = {
        id: '',
        username: '',
        fullname: '',
        password: '',
        phone: '',
        email:'',
        address:'',

    };
    $scope.isSuccess = true;
    $scope.isLoading = true;  
    
}