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

  const apiStatistic = 'http://localhost:8080/n3t/statistic';


  $scope.beginDate = '';
  $scope.endDate = '';

  // Function to get chart data from server
  $scope.getChartDataMonth = function () {
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

      // Create an array of months between the begin and end date
      var begin = moment(beginDate, "YYYY-MM-DD");
      var end = moment(endDate, "YYYY-MM-DD");
      var current = moment(begin);
      var labels = [];
      var data = [];

      while (current <= end) {
        labels.push(current.format('YYYY-MM-DD'));
        data.push(0);
        current.add(1, 'month');
      }

      // Update the data array with chart data
      for (var i = 0; i < chartData.length; i++) {
        var month = moment(chartData[i].dd, 'M').format('YYYY-MM-DD');
        var index = labels.indexOf(month);
        if (index > -1) {
          data[index] = chartData[i].total;
        }
      }

      // Draw chart using chart.js library
      var ctx = document.getElementById('chartM').getContext('2d');
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
              label: function (tooltipItem, data) {
                var label = data.labels[tooltipItem.index];
                var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                return label + ': ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' đơn hàng';
              }
            }
          },
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }, function (error) {
      console.log(error);
    });
  };

  $scope.updateChart = function () {
    $scope.getChartDataMonth();
  };

  $scope.getChartDataDay = function () {

    // Send request to server to get chart data
    $http.get(apiStatistic + '/count-by-day', {
      params: {
        month: $scope.month,
        year: $scope.year
      }
    }).then(function (response) {
      // Create a list of dates for the month
      var daysInMonth = moment($scope.year + '-' + $scope.month, "YYYY-MM").daysInMonth();
      var labels = [];
      for (var i = 1; i <= daysInMonth; i++) {
        labels.push(i.toString());
      }

      // Add data for each date in the response
      var data = [];
      for (var i = 0; i < response.data.length; i++) {
        var date = moment(response.data[i].dd).format('DD');
        var total = response.data[i].total;
        data[date - 1] = total;
      }

      // Fill in missing data with zeros
      for (var i = 0; i < data.length; i++) {
        if (data[i] === undefined) {
          data[i] = 0;
        }
      }

      var ctx = document.getElementById('chartD').getContext('2d');
      var chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Doanh số bán hàng theo ngày',
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
            text: 'Biểu đồ doanh số bán hàng theo ngày'
          },
          legend: {
            display: false
          },
          tooltips: {
            callbacks: {
              label: function (tooltipItem, data) {
                var label = data.labels[tooltipItem.index];
                var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                return label + ': ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' đơn hàng';
              }
            }
          },
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }, function (error) {
      console.log(error);
    });
  };

  $scope.updateChartD = function () {
    $scope.getChartDataDay();
  };

  $scope.years = [];
  var currentYear = new Date().getFullYear();
  for (var i = currentYear; i >= 2021; i--) {
    $scope.years.push(i);
  }

}