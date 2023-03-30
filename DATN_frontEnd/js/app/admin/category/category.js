function category($scope, $http, $rootScope) {

  $rootScope.isAdmin = false;

    const userLocal = localStorage.getItem("user");
    const user = userLocal ? JSON.parse(userLocal) : null;
    
    if(user) {
      user.roles.map(item => {
          if(item == "ADMIN"){
              $rootScope.isAdmin = true;            
          } 
      })
    }

  $scope.category = {
    id: "",
    name: "",
    status: "AVAILABLE",
    createBy: null,
    updateBy: null,
  };
  $scope.brand = {
    id: "",
    name: "",
    status: "AVAILABLE",
  };
  $scope.brandCategory = {
    id: "",
    idBrand: "",
    idCategory: [],
  };
  $scope.categories = [];
  $scope.categoriesList = []; //array de hien thi danh sach
  $scope.brands = [];
  $scope.brandsList = [];
  $scope.brandsCategories = [];

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
  const apiCategory = "http://localhost:8080/laclac/category";
  const apiBrand = "http://localhost:8080/laclac/brand";
  const apiBrandsCategories = "http://localhost:8080/laclac/brand-category";

  /**get all brands */
  $http.get(apiBrand)
    .then(function (response) {
      $scope.brands = response.data;
      $scope.isLoading = false;
    })
    .catch(function (error) {
      console.log(error);
      $scope.isLoading = false;
    });

  /**get all category */
  $http.get(apiCategory)
    .then(function (response) {
      $scope.categories = response.data;
      $scope.isLoading = false;
    })
    .catch(function (error) {
      console.log(error);
      $scope.isLoading = false;
    });

  /**get all category search */
  getAllCategory = (api) => {
    $http
      .get(api)
      .then(function (response) {
        $scope.categories = response.data;
        pageging();
        $scope.isLoading = false;
      })
      .catch(function (error) {
        console.log(error);
        $scope.isLoading = false;
      });
  };
  getAllCategory(apiCategory);

  /**save category */
  $scope.saveCategory = function (event) {
    event.preventDefault();
    // console.log($scope.category);
    $http
      .post(apiCategory, $scope.category)
      .then(function (response) {
        if ($scope.index > -1) {
          $scope.categories[$scope.index] = response.data;
        } else {
          $scope.categories.push(response.data);
        }
        $scope.isLoading = false;
        $scope.isSuccess = true;
        alertShow();
        $scope.message = "Lưu danh mục thành công !";
        clearCategory();
      })
      .catch(function (error) {
        console.log(error);
        $scope.isLoading = false;
        $scope.isSuccess = false;
        alertShow();
        $scope.message = "Thất bại, vui lòng thử lại !";
        $scope.index = -1;
      });
  };

  /**save brand */

  $scope.saveBrand = function (event) {
    event.preventDefault();
    // console.log($scope.brand);
    $http
      .post(apiBrand, $scope.brand)
      .then(function (response) {
        if ($scope.index > -1) {
          $scope.brands[$scope.index] = response.data;
        } else {
          $scope.brands.push(response.data);
        }
        $scope.isLoading = false;
        $scope.isSuccess = true;
        alertShow();
        $scope.message = "Lưu nhãn hiệu thành công !";
        $scope.index = -1;
        $scope.brand = {
          id: "",
          name: "",
          status: "AVAILABLE",
        };
      })
      .catch(function (error) {
        console.log(error);
        $scope.isLoading = false;
        $scope.isSuccess = false;
        alertShow();
        $scope.message = "Thất bại, vui lòng thử lại !";
      });
  };

  /**search category by name */
  $scope.searchCategory = () => {
    $scope.page.page = 0;
    if ($scope.categoryName) {
      getAllCategory(apiCategory + "/get-by-name?name=" + $scope.categoryName);
    } else {
      $scope.categoryName = "";
      getAllCategory(apiCategory);
    }
  };

  $scope.page = {
    page: 0,
    size: 10,
  };
  /**phan trang category*/
  function pageging() {
    var start = $scope.page.page * $scope.page.size;
    $scope.categoryList = $scope.categories.slice(
      start,
      start + $scope.page.size
    );
  }
  /**trang phia truoc */
  $scope.prev = function () {
    var count = Math.ceil($scope.categories.length / $scope.page.size);
    $scope.page.page--;
    if ($scope.page.page < 0) {
      $scope.page.page = count - 1;
    }
    pageging();
  };
  /**trang tiep theo */
  $scope.next = function () {
    var count = Math.ceil($scope.categories.length / $scope.page.size);
    ++$scope.page.page;

    if ($scope.page.page >= count) {
      $scope.page.page = 0;
    }
    pageging();
  };
  /**thay doi trong input */
  $scope.changePageCategory = () => {
    var count = Math.ceil($scope.categories.length / $scope.page.size);
    if ($scope.page.page <= 0 || null || $scope.page.page == undefined) {
      $scope.page.page = 0;
    }
    if ($scope.page.page > count) {
      $scope.page.page = count - 1;
    }
    pageging();
  };
  /**phan trang brand*/
  function pageging() {
    var start = $scope.page.page * $scope.page.size;
    $scope.brandList = $scope.brands.slice(start, start + $scope.page.size);
  }
  /**trang phia truoc */
  $scope.prev = function () {
    var count = Math.ceil($scope.brands.length / $scope.page.size);
    $scope.page.page--;
    if ($scope.page.page < 0) {
      $scope.page.page = count - 1;
    }
    pageging();
  };
  /**trang tiep theo */
  $scope.next = function () {
    var count = Math.ceil($scope.brands.length / $scope.page.size);
    ++$scope.page.page;

    if ($scope.page.page >= count) {
      $scope.page.page = 0;
    }
    pageging();
  };
  /**thay doi trong input */
  $scope.changePageBrand = () => {
    var count = Math.ceil($scope.brands.length / $scope.page.size);
    if ($scope.page.page <= 0 || null || $scope.page.page == undefined) {
      $scope.page.page = 0;
    }
    if ($scope.page.page > count) {
      $scope.page.page = count - 1;
    }
    pageging();
  };
  /** delete category */
  $scope.deleteCategory = (categoryId, index) => {
    $http.delete(apiCategory + "/" + categoryId)
      .then(function (response) {
        $scope.categories.splice(index, 1);
        $scope.categoriesList.splice(index, 1);
        $scope.isLoading = false;
        $scope.isSuccess = true;
        alertShow();
        $scope.message = "Xóa danh mục thành công !";
      })
      .catch(function (error) {
        console.log(error);
        $scope.isLoading = false;
        $scope.isSuccess = false;
        alertShow();
        $scope.message = "Thất bại , vui lòng thử lại !";
      });
  };
  /** delete brand */
  $scope.deleteBrand = (brandId, index) => {
    $http.delete(apiBrand + "/" + brandId)
      .then(function (response) {
        $scope.brands.splice(index, 1);
        $scope.brandsList.splice(index, 1);
        $scope.isLoading = false;
        $scope.isSuccess = true;
        alertShow();
        $scope.message = "Xóa nhãn hiệu thành công !";
      })
      .catch(function (error) {
        console.log(error);
        $scope.isLoading = false;
        $scope.isSuccess = false;
        alertShow();
        $scope.message = "Thất bại, vui lòng thử lại !";
      });
  };

  /**edit category */
  $scope.editCategory = function (index) {
    const item = $scope.categories[index];
    $scope.index = index;
    $scope.category.id = item.id;
    $scope.category.categoryId = $scope.categoryId;
    $scope.category.name = item.name;
    $scope.category.status = item.status;
    // $scope.brand.categoryId = item.category.id;
  };

  /**edit brand */
  $scope.editBrand = function (index) {
    const item = $scope.brands[index];
    $scope.index = index;
    $scope.brand.id = item.id;
    $scope.brand.brandId = $scope.brandId;
    $scope.brand.name = item.name;
    $scope.brand.status = item.status;
    // $scope.brand.categoryId = item.category.id;
  };

  clearCategory = function () {
    $scope.category = {
      id: "",
      category: $scope.categoryId,
      name: "",
      status: "",
    };
  };

  /**get all brandsCategories by brandId */
  getAllBrandCategory = async (brandId) => {
    await $http.get(apiBrandsCategories + "/" + brandId)
      .then(function (response) {
        $scope.brandsCategories = response.data;      
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /**chọn brand */
  $scope.chooseBrand = async (brand) => {
    await getAllBrandCategory(brand.id);
  }

  /**check xem category này đã có trong brand chưa */
  $scope.brandCategory = (category) => {
    return $scope.brandsCategories.find(item => item.category.id == category.id);
  }

  /**thay đổi category trong brand */
  $scope.changeCategoryInBrand = (category, brand) => {

    const result = $scope.brandCategory(category);

    if(result) {
      /**xóa category trong brandCategory khỏi database */
      const index = $scope.brandsCategories.findIndex(item => item.category.id == category.id);
      
      $http.delete(apiBrandsCategories + "/" + $scope.brandsCategories[index].id)
        .then(response => {
          $scope.isSuccess = true;
          $scope.message = "Cập nhật thành công";
          $scope.brandsCategories.splice(index, 1);
        })
        .catch(errror => {
          console.log(errror);
          $scope.isSuccess = false;
          $scope.message = "Có lỗi xảy ra, vui lòng thử lại";
        })
      } else {
        /**thêm category vào brandCategory database */
        const newBrandCategory = {
          id: '',
          brand: brand,
          category: category
        }

        $http.post(apiBrandsCategories, newBrandCategory)
        .then(response => {
          $scope.isSuccess = true;
          $scope.message = "Cập nhật thành công";
          $scope.brandsCategories.push(response.data);
        })
        .catch(errror => {
          console.log(errror);
          $scope.isSuccess = false;
          $scope.message = "Có lỗi xảy ra, vui lòng thử lại";
        })
      }
    alertShow();

  }
  
}
