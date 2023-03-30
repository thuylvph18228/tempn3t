function adminSaleReport ($scope, $http, $rootScope) {

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

  $scope.labels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
  // $scope.series = ['Series A'];

  $scope.data = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  const apiStatistic = 'http://localhost:8080/laclac/statistic';
  
  $scope.year = new Date().getFullYear();

  $http.get(apiStatistic + "/countOrder?year=" + $scope.year)
    .then(res => {
      res.data.forEach(item => {
        $scope.data[0][item[0] - 1] = item[1];
      })
    })
    .catch(err => {
      console.log(err);
    })

}