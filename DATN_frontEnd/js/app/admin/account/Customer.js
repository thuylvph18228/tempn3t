function customer($scope, $http) {
    $scope.user = {
      id: "",
      username: "",
      fullname: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      status: "ACTIVE",
      avatar: "",
    };
  
    $scope.users = [];
    $scope.status = [];
    $scope.roles = [];
    $scope.user_roles = [];
    $scope.usersList = [];
  
    $scope.isLoading = false;
    $scope.isSuccess = true;
    $scope.message = "";
    $scope.index = -1;
  
    /**hien thi thong bao */
    alertShow = () => {
      $(document).ready(function () {
        $(".toast").toast("show");
      });
    };
    const apiUser = "http://localhost:8080/laclac/user";
    const apiOrder = "http://localhost:8080/laclac/order";
    
    getAllUser = () => {
        $http.get(apiUser + "/get-by-role?role=" + "USER")
      .then(function (response) {
        $scope.users = response.data;
        $scope.isLoading = false;
      })
      .catch(function (error) {
        console.log(error);
        $scope.isLoading = false;
      });
    }
    getAllUser();
    
  
    /**save user */
    $scope.saveUser = function (event) {
      event.preventDefault();
      $http
        .post(apiUser, $scope.user)
        .then(function (response) {
          if ($scope.index > -1) {
            $scope.users[$scope.index] = response.data;
          } else {
            $scope.users.push(response.data);
          }
          $scope.isLoading = false;
          $scope.isSuccess = true;
          alertShow();
          $scope.message = "Lưu thành công !";
          clearUser();
          $scope.index = -1;
        })
        .catch(function (error) {
          console.log(error);
          $scope.isLoading = false;
          $scope.isSuccess = false;
          alertShow();
          $scope.message = "Thất bại, vui lòng thử lại !";
        });
    };
  
    /** delete user */
    $scope.deleteUser = (userId, index) => {
      $scope.users.splice(index, 1);
      $scope.usersList.splice(index, 1);
      $http
        .delete(apiUser + "/" + userId)
        .then(function (response) {
          $scope.users.splice(index, 1);
          $scope.usersList.splice(index, 1);
          $scope.isLoading = false;
          $scope.isSuccess = true;
          alertShow();
          $scope.message = "Xóa thành công !!";
        })
        .catch(function (error) {
          console.log(error);
          $scope.isLoading = false;
          $scope.isSuccess = false;
          alertShow();
          $scope.message = "Thất bại , vui lòng thử lại !";
        });
    };
    /**edit user */
    $scope.editUser = function (index) {
      const item = $scope.users[index];
      $scope.index = index;
      console.log(item);
      $scope.user.id = item.id;
      $scope.user.userId = $scope.userId;
      $scope.user.fullname = item.fullname;
      $scope.user.address = item.address;
      $scope.user.username = item.username;
    };
  
    $scope.page = {
      page: 0,
      size: 10,
    };
    /**phan trang */
    function pageging() {
      var start = $scope.page.page * $scope.page.size;
      $scope.userList = $scope.users.slice(start, start + $scope.page.size);
    }
    /**trang phia truoccc */
    $scope.prev = function () {
      var count = Math.ceil($scope.users.length / $scope.page.size);
      $scope.page.page--;
      if ($scope.page.page < 0) {
        $scope.page.page = count - 1;
      }
      pageging();
    };
    /**trang tiep theooo */
    $scope.next = function () {
      var count = Math.ceil($scope.users.length / $scope.page.size);
      ++$scope.page.page;
  
      if ($scope.page.page >= count) {
        $scope.page.page = 0;
      }
      pageging();
    };
  
    clearUser = function () {
      $scope.user = {
        id: "",
        user: $scope.userId,
        fullname: "",
        phone: "",
        address: "",
        username: "",
        password: "",
      };
    };

    $scope.detail = (username) => {
      console.log(username);
      $http.get(apiOrder + "/user/" + username)
        .then(res => {
            $scope.orders = res.data;
            $scope.orders.forEach(element => {
                element.totalMoney = 0;
                element.orderDetails.forEach(item => {
                    element.totalMoney += item.quantity * item.price;
                })
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    $scope.info = '';
    $scope.search = () => {
        if($scope.info.length){
            $http.get(apiUser + "/find-by-fullname-or-phone/" + $scope.info)
                .then(res => {
                    $scope.users = res.data;
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            getAllUser();
        }
        $scope.orders = [];
    }

    $scope.updateStatusCustomer = (customer, index) => {
      if(customer.status == 'ACTIVE'){
          customer.status = "BLOCKED";
      } else {
          customer.status = "ACTIVE"
      }

      $http.post(apiUser, customer)
          .then(res => {
              $scope.isLoading = false;
              $scope.isSuccess = true;
              $scope.message = "Đã cập nhật trạng thái";
          })
          .catch(err => {
              console.log(err);
              $scope.isLoading = false;
              $scope.isSuccess = false;
              $scope.message = "Có lỗi xảy ra khi cập nhật ";
          })
      alertShow();
    }
  }






