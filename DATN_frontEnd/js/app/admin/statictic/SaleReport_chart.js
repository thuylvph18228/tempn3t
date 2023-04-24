function adminSaleReport($scope, $http, $rootScope) {

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

  // $scope.labels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
  // // $scope.series = ['Series A'];

  // $scope.data = [
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  // ];

  const apiStatistic = 'http://localhost:8080/n3t/statistic';

  // $scope.year = new Date().getFullYear();

  // $http.get(apiStatistic + "/countOrder?year=" + $scope.year)
  //   .then(res => {
  //     res.data.forEach(item => {
  //       $scope.data[0][item[0] - 1] = item[1];
  //     })
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })

  $scope.beginDate = '';
  $scope.endDate = '';

  // Function to get chart data from server
  $scope.getChartData = function () {
    // Get begin and end date from form
    var beginDate = $scope.beginDate;
    var endDate = $scope.endDate;

    // Send request to server to get chart data
    $http.get(apiStatistic + '/countOrderByTime', {
      params: {
        begin: beginDate,
        end: endDate
      }
    }).then(function (response) {
      // Draw chart using chart.js library
      var chartData = response.data;
      console.log(chartData)
      var labels = [];
      var data = [];

      // Get an array of months between the begin and end date
      var begin = moment(beginDate, "YYYY-MM-DD");
      var end = moment(endDate, "YYYY-MM-DD");
      var current = moment(begin);
      while (current <= end) {
        labels.push(current.format('YYYY-MM'));
        data.push(0);
        current.add(1, 'month');
      }

      for (var i = 0; i < chartData.length; i++) {
        labels.push(moment(chartData[i].month, 'M').format('YYYY-MM'));
        data.push(chartData[i].total);
    }

      // for (var i = 0; i < chartData.length; i++) {
      //   var monthIndex = labels.indexOf(chartData[i].month);
      //   if (monthIndex >= 0) {
      //     data[monthIndex] = chartData[i].total;
      //   }
      // }

      // for (var i = 0; i < chartData.length; i++) {
      //   labels.push(chartData[i].month);
      //   data.push(chartData[i].total);
      // }

      var ctx = document.getElementById('chart').getContext('2d');
      var chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Doanh số bán hàng',
            data: data,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          },
          title: {
              display: true,
              text: 'Biểu đồ doanh số bán hàng theo tháng'
          },
          legend: {
              display: false
          },
          tooltips: {
              callbacks: {
                  label: function(tooltipItem, data) {
                      var label = data.labels[tooltipItem.index];
                      var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                      return label + ': ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' đơn hàng';
                  }
              }
          },
          responsive: true,
          maintainAspectRatio: false
      }
        // options: {
        //   scales: {
        //     yAxes: [{
        //       ticks: {
        //         beginAtZero: true
        //       }
        //     }]
        //   },
        //   maxHeight: 500
        // }
      });
    }, function (error) {
      console.log(error);
    });
  };

}