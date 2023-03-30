function homeAdmin ($scope, $http, $rootScope) {
    
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
    $scope.status = "WAIT_FOR_CONFIRMATION";

    $scope.isLoading = false;
    $scope.isSuccess = true;
    $scope.message = ""
    $scope.pageIndex = 0;
    $scope.totalPage = '';

    $scope.province = {};
    $scope.district = {};
    $scope.ward = {};
    $scope.listProvince = [];
    $scope.listDistrict = [];
    $scope.listWard = [];
    $scope.SL_Order; 
    $scope.DS_Order; 
    $scope.t == 0;
    const apiOrder = 'http://localhost:8080/laclac/order';
    const statistic = "http://localhost:8080/laclac/thong-ke"; 
    
    /**hien thi thong bao */
    alertShow = () => {
        $(document).ready(function(){
            $('.toast').toast('show');
        });
    }
    
    $http.get(statistic)
      .then(function (response) {
        $scope.SL_Order = response.data;
      })
      .catch(function (error) {
      });

    getAllOrder = (page, status) => {
        $scope.isLoading = true;
        $http.get(apiOrder + "/status" + "?page=" + page + "&status=" + status) 
            .then(function (response) {                    
                $scope.DS_Order = response.data[0];
                $scope.totalPage = response.data[1];
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
    getAllOrder(0, $scope.status);
    $scope.prev = () => {
        if($scope.pageIndex <= 0) {
            $scope.pageIndex  = 0;
            getAllOrder(0, $scope.status);
        } else {
            $scope.pageIndex--;
            getAllOrder($scope.pageIndex, $scope.status);
        }
    }

    $scope.next = () => {
        if($scope.pageIndex == $scope.totalPage - 1) {
            $scope.pageIndex = $scope.totalPage - 1;
            getAllOrder($scope.totalPage - 1, $scope.status);
        } else {
            $scope.pageIndex++;
            getAllOrder($scope.pageIndex, $scope.status);
        }
    }


    /**cập nhật trạng thái đơn hàng */
    updateStatus = (order, message, index) => {
        $http.put(apiOrder + "/update-status", order)
        .then( (response) => {
            // $scope.DS_Order.splice(index, 1);
            $scope.isLoading = false;
            $scope.isSuccess = true;
            $scope.message = message;
            alertShow();
            getAllOrder(0, $scope.status);
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
        var message = "Xác nhận đơn hàng thành công"
        order.status = "CONFIRMED";
        updateStatus(order, message, index);     
    }

    $scope.chosesOrder = (index) => {
        totalOrder($scope.DS_Order[index]);
    }

    /**tinh tong tien cua don hang */
    $scope.totalMoney = 0;
    totalOrder = (order) => {
        $scope.totalMoney = 0;
        order.orderDetails.map(item => {
            $scope.totalMoney += item.price * item.quantity;
        });
    }

    // $scope.labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];
    $scope.labels = [];
 
    $scope.data = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    const apiStatistic = 'http://localhost:8080/laclac/statistic';
    
    $scope.month = new Date().getMonth() + 1;
    $scope.year = new Date().getFullYear();
    $scope.date = new Date().getDate();

    for(var i = 1; i <= $scope.date; i++){
        $scope.labels.push(i);
    }

    $http.get(apiStatistic + "/count-in-month?month=" + $scope.month + "&year=" + $scope.year)
        .then(res => {
            res.data.forEach(item => {
                $scope.data[0][item[0] - 1] = item[1];
            })
        })
        .catch(err => {
            console.log(err);
        })

        $scope.data1 = [];
        $scope.labels1 = [];

    $http.get(apiStatistic + "/get-product")
        .then(res => {
            res.data.forEach(item => {
                $scope.data1.push(item[2]);
                $scope.labels1.push(item[1]);
            })
        })
        .catch(err => {
            console.log(err);
        })

  }

  