function home ($scope, $http, $rootScope) {

    $scope.showImageDetail = true;

    if($rootScope.isAdmin == true){
        document.location.href = "#admin-dashboard";
    }

    $scope.product = {
        id: '',
        code: '',
        name: '',
        avatar: '',
        price: '',
        listed_price: '',
        sex:'',
        brand:'',
        category: '',
        origin: '',
        weight: '',
        status: 'AVAILABLE',
        description:'',
        createBy: null,
        updateBy: null,
        createDate: Date.now,
        updateDate: null,
        images: [$scope.image]
    };

    $scope.productt = {
        color: '',
        height: '',
        size: '',
        formPrice: '',
        toPrice: '',
        categoryId:'',
        pageIndex: 0,
        pageSize: 20,
    };


    $scope.image = {
        id: '',
        productId: '',
        path: ''
    }

    $scope.listVoucher = [];
    $scope.topProduct = [];
    $scope.products = [];
    $scope.productst = [];
    $scope.isLoading = false;

    const apiVoucher = 'http://localhost:8080/n3t/voucher';
    const apiProduct = "http://localhost:8080/n3t/product";
    const apiProductt = "http://localhost:8080/n3t/product/get-page";
    const apiUser = "http://localhost:8080/n3t/user";

    // getAllProduct = (apiProduct, page, size) => {
    //     $scope.isLoading = true;
    //     $http.get(apiProduct + "/index" + "?page=" + page + "&size=" + size)
    //         .then(function (response) {                    
    //             $scope.products = response.data[0];
    //             $scope.count = response.data[1];
    //             $scope.isLoading = false;
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //             $scope.isLoading = false;
    //         });
    // }
    // getAllProduct(apiProduct, 0, 20);


    $scope.getAllProductt = (apiProduct, productt) => {
        $scope.isLoading = true;
        $http.post(apiProductt , $scope.productt )
            .then(function (response) {                    
                $scope.productst = response.data.content;
                $scope.count = response.data.totalPages;
                $scope.isLoading = false;
            })
            .catch(function (error) {
                console.log(error);
                $scope.isLoading = false;
            });

    }
    $scope.getAllProductt(apiProduct, $scope.productt);


    $http.get(apiProduct+"/hotproduct")
    .then(function (response) {
        $scope.topProduct = response.data;
        $scope.isLoading = true;
    })
    .catch(function (error) {
        console.log(error);
        $scope.isLoading = false;
    });


    $http.get(apiVoucher+"/byStatus")
        .then(function (response) {
            $scope.listVoucher = response.data;
            $scope.isLoading = false;
        })
        .catch(function (error) {
            console.log(error);
            $scope.isLoading = false;
        });

    
    $scope.addToCard = (product, index) => {
         console.log(product, index);
    }

    $scope.page = {
		page: 0,
		size: 20,
    }
    /**phan trang */
    function pageging(){
        getAllProduct(apiProduct, $scope.page.page, $scope.page.size);
    }
	/**trang phia truoc */
    $scope.prev = function(){
        $scope.page.page--;
        $scope.productt.pageIndex =  $scope.page.page;
        if($scope.page.page < 0){
            $scope.page.page = $scope.count - 1;
            $scope.productt.pageIndex = $scope.count - 1;
        }
        $scope.getAllProductt(apiProduct, $scope.productt);
        // pageging();
    }
    /**trang tiep theo */
    $scope.next = function(){
        ++$scope.page.page;
        $scope.productt.pageIndex = $scope.page.page;
        if($scope.page.page >= $scope.count){
            $scope.page.page = 0;
            $scope.productt.pageIndex = 0;
        }
        $scope.getAllProductt(apiProduct, $scope.productt);
        // pageging();
    }

     /**get all category */
     $http.get("http://localhost:8080/n3t/category")
     .then(function (response) {                    
         $scope.categories = response.data;
         $scope.isLoading = false;
     })
     .catch(function (error) {
         console.log(error);
         $scope.isLoading = false;
     });
 

      /**get all Kích thước */
      $http.get("http://localhost:8080/n3t/size")
      .then(function (response) {                    
          $scope.sizeShoess = response.data;
          $scope.isLoading = false;
      })
      .catch(function (error) {
          console.log(error);
          $scope.isLoading = false;
      });

       /**get all color */
       $http.get("http://localhost:8080/n3t/color")
       .then(function (response) {                    
           $scope.colors = response.data;
           $scope.isLoading = false;
       })
       .catch(function (error) {
           console.log(error);
           $scope.isLoading = false;
       });

       /**get all height */
       $http.get("http://localhost:8080/n3t/height")
       .then(function (response) {                    
           $scope.heights = response.data;
           $scope.isLoading = false;
       })
       .catch(function (error) {
           console.log(error);
           $scope.isLoading = false;
       });

       $scope.resetFilter = () => {
        
        $scope.productt = {
            color: '',
            height: '',
            size: '',
            formPrice: '',
            toPrice: '',
            categoryId:'',
            pageIndex: 0,
            pageSize: 20,
        };
        $scope.getAllProductt(apiProduct, $scope.productt);
    }

    const userLocal = localStorage.getItem("user");
    const user = userLocal ? JSON.parse(userLocal) : null;

    if(user){
        $http.get(apiUser + "/get-by-username?username=" + user.username)
            .then(res => {
                if(res.data){
                    $rootScope.user = res.data;
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    $(document).ready(function(){
        $(window).scroll(function(){
            if($(this).scrollTop()){
                $('#backtop').fadeIn();
            }else{
                $('#backtop').fadeOut();
            }
        });
        $("#backtop").click(function(){
            $('html,body').animate({
            scrollTop: 0
            }, 500)
        });
    });
}