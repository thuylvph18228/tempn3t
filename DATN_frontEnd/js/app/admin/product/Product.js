function product ($scope, $http, $rootScope) {
    
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

    $scope.product = {
        id: '',
        code: '',
        name: '',
        avatar: '',
        price: '',
        sex:'',
        brand: null,
        category: null,
        origin: null,
        weight: null,
        status: 'AVAILABLE',
        description:'',
        createBy: null,
        updateBy: null,
        createDate: Date.now,
        updateDate: null,
        images: []
    };

    $scope.image = {
        id: '',
        productId: '',
        path: ''
    }

    $scope.products = [];
    $scope.images = [];
    $scope.brands = [];
    $scope.categories = [];
    $scope.colors = [];
    $scope.heights = [];
    $scope.weights = [];
    $scope.origins = [];
    $scope.sex = ["Nam", "Nữ", "Tất cả"];
    $scope.materials = [];
    $scope.sizes = [];
    $scope.status = [];
    $scope.productsList = []; //array de hien thi danh sach san pham


    $scope.isLoading = false;
    $scope.isSuccess = true;
    $scope.message = "";
    $scope.index = -1;

    /**hien thi thong bao */
    alertShow = () => {
        $(document).ready(function(){
            $('.toast').toast('show');
        });
    }

    const api = 'http://localhost:8080/laclac/product';
    $scope.isLoading = true;
    
    /**get all product */
    getAllProduct = (api, page, size) => {
        $http.get(api + "/index" + "?page=" + page + "&size=" + size)
            .then(function (response) {
                $scope.products = response.data[0];
                $scope.products.forEach((element, index) => {
                    // element.index = index + 1;
                    element.quantity = 0;
                    element.sold = 0;
                    element.productDetails.forEach(item => {
                        element.quantity += Number(item.quantity);
                        item.orderDetail.forEach(orderDetail => {
                            element.sold += Number(orderDetail.quantity);
                            
                        })
                    })
                });
                if(response.data[2] && response.data[2] != null){
                    $scope.totalProduct = response.data[2];
                }
                $scope.productsList = $scope.products;
                $scope.count = response.data[1];
                $scope.isLoading = false;
            })
            .catch(function (error) {
                console.log(error);
                $scope.isLoading = false;
            });
    }
    getAllProduct(api, 0, 10);

    /**get all brands */
    $http.get("http://localhost:8080/laclac/brand")
        .then(function (response) {                    
            $scope.brands = response.data;
            $scope.isLoading = false;
        })
        .catch(function (error) {
            console.log(error);
            $scope.isLoading = false;
        });
    
    /**get all category */
    $http.get("http://localhost:8080/laclac/category")
    .then(function (response) {                    
        $scope.categories = response.data;
        $scope.isLoading = false;
    })
    .catch(function (error) {
        console.log(error);
        $scope.isLoading = false;
    });

    /** get all categories by brandId */
    $scope.changeBrand = function(){
        
        // if($scope.product.brand){
        //     $http.get("http://localhost:8080/laclac/brand-category" + "/" + $scope.product.brand.id)
        //         .then(function (response) {                    
        //             $scope.categories = response.data;
        //             $scope.isLoading = false;
        //         })
        //         .catch(function (error) {
        //             console.log(error);
        //             $scope.isLoading = false;
        //         });
        // }
    };

    getAllCategories = function(){
        $http.get("http://localhost:8080/laclac/category")
            .then(function (response) {                    
                $scope.categories = response.data;
                $scope.isLoading = false;
            })
            .catch(function (error) {
                console.log(error);
                $scope.isLoading = false;
            });
    };
    getAllCategories();
        
    /**get all weights */
    $http.get("http://localhost:8080/laclac/weight")
        .then(function (response) {                    
            $scope.weights = response.data;
            $scope.isLoading = false;
        })
        .catch(function (error) {
            console.log(error);
            $scope.isLoading = false;
        });

    /**get all origins */
    $http.get("http://localhost:8080/laclac/origin")
        .then(function (response) {                    
            $scope.origins = response.data;
            $scope.isLoading = false;
        })
        .catch(function (error) {
            console.log(error);
            $scope.isLoading = false;
        });

    /**create product */
    $scope.createProduct = function(event){
        // var brandName = "";
        // var categoryName = "";
        // $http.get("http://localhost:8080/laclac/brand/" + $scope.product.brand)
        // .then(function (response) {                    
        //     brandName = response.data.name.toUpperCase().substr(0, 3);
        //     $scope.isLoading = false;
        // })
        // .catch(function (error) {
        //     console.log(error);
        //     $scope.isLoading = false;
        // });

        // $http.get("http://localhost:8080/laclac/category/" + $scope.product.category)
        // .then(function (response) {                    
        //     categoryName = response.data.name.toUpperCase().substr(0, 3);
        //     $scope.isLoading = false;
        // })
        // .catch(function (error) {
        //     console.log(error);
        //     $scope.isLoading = false;
        // });

        // $scope.product.code = brandName + "_" + categoryName + "_"  

        console.log($scope.product);
        event.preventDefault();
        $http.post(api, $scope.product)
            .then(function (response) {                    
                $scope.products.push(response.data);
                document.location.href = "#admin/product-detail/" + response.data.id + "?reload=1" ;
                $scope.isLoading = false;
                $scope.isSuccess = true;
                alertShow();
                $rootScope.message = "Lưu sản phẩm thành công"
            })
            .catch(function (error) {
                console.log(error);
                $scope.isLoading = false;
                $scope.isSuccess = false;
                alertShow();
                $scope.message = "Có lỗi xảy ra, vui lòng thử lại !"
            });
    }


    $scope.page = {
		page: 0,
		size: 10,
    }
    /**phan trang */
    function pageging(){
        getAllProduct(api, $scope.page.page, $scope.page.size);
        $scope.productsList = $scope.products;
    }
	/**trang phia truoc */
    $scope.prev = function(){
        $scope.page.page--;
        if($scope.page.page < 0){
            $scope.page.page = $scope.count - 1;
        }
        pageging();
    }
    /**trang tiep theo */
    $scope.next = function(){
        ++$scope.page.page;
        if($scope.page.page >= $scope.count){
            $scope.page.page = 0;
        }
        pageging();
    }
    /**thay doi trong input */
    $scope.changePage = () =>{
        if($scope.page.page <= 0 || null || $scope.page.page == undefined){
            $scope.page.page = 0;
        } if($scope.page.page > $scope.count) {
            $scope.page.page = $scope.count -1 ;
        }
        // pageging();
    }

    /**loc san pham */
    function filterProduct(brandId, categoryId, quantityOrder, quantity){

        $http.get("http://localhost:8080/laclac/product")
        .then(function (response) {                    
            $scope.origins = response.data;
            $scope.isLoading = false;
        })
        .catch(function (error) {
            console.log(error);
            $scope.isLoading = false;
        });

    }
    /**search product by name */
    $scope.searchProduct = () => {
        $scope.page.page = 0;
        if($scope.productName){
            getAllProduct(api + "/get-by-name/"+ $scope.productName, $scope.page.page, $scope.page.size);
        } else{
            $scope.productName = "";
            getAllProduct(api, 0, 10);
        }
    }

    $scope.deleteProduct = (productId, index) =>{
        $scope.products.splice(index, 1);
        $scope.productsList.splice(index, 1);
        $http.delete(api +"/" + productId)
            .then(function (response) {                    
                $scope.products.splice(index, 1);
                $scope.productsList.splice(index, 1);
                $scope.isLoading = false;
                $scope.isSuccess = true;
                alertShow();
                $scope.message = "Xóa sản phẩm thành công"
            })
            .catch(function (error) {
                console.log(error);
                $scope.isLoading = false;
                $scope.isSuccess = false;
                alertShow();
                $scope.message = "Có lỗi xảy ra, vui lòng thử lại !"
            });
    }

    // upload file to fire base
    async function uploadImageToFirebase(file) {
        const ref = firebase.storage().ref();
        let metaData = {
            contentType: file.type
        }
        let name = (Math.random() * 100) + file.name ;
        var urlImg = '';
        const uploadImg = ref.child('images/' + name).put(file, metaData);
        await uploadImg
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then(url => {
                urlImg = url;
                console.log(url);
            }) 
            .catch(error => {
                console.log(error);
            })
        return urlImg;
    }

    /**upload anh san pham */
    $scope.uploadImage = (files, name) => {
        if (!files || !files[0]) return;

        // $scope.product.images = [];
        for (var i = 0; i < files.length; i++) {
            var j = i;
            const FR = new FileReader();
            FR.readAsDataURL(files[i]);
            FR.addEventListener("load", function(evt) {
                var newImage = {
                    id: '',
                    productId: '',
                    path: ''
                }
                $scope.$apply(async function() {
                    if(name == 'avatar'){
                        $scope.avatar = evt.target.result; 
                        $scope.product.avatar = await uploadImageToFirebase(files[j])
                    } 
                    else if (name == 'images'){
                        for(var a = 0; a < $scope.images.length; a++){
                            if($scope.images[a] == evt.target.result) {
                                continue;
                            }
                        }

                        $scope.images.push(evt.target.result); 
                        newImage.path = await uploadImageToFirebase(files[j]);
                        $scope.product.images.push(newImage);
                    }
                });
            }); 
        }   
        console.log($scope.product);     
    };

    /**xoa avatar */
    $scope.deleteAvatar = () => {
        $scope.avatar = "";
    }

    /** Xoa image chi tiet*/
    $scope.deleteImage = (index) => {
        $scope.images.splice(index, 1);
    }

    $scope.properties = {
        name: "",
        status: "AVAILABLE"
    };
    $scope.type = 1;
    $scope.addBrand = () => {
        $scope.modalTitle = "Thêm mới nhãn hiệu"
        $scope.type = 1;
        $('#exampleModal').modal('show');
    }

    $scope.addCategory = () => {
        $scope.modalTitle = "Thêm mới danh mục"
        $scope.type = 2;
        $('#exampleModal').modal('show');
    }

    $scope.addWeight = () => {
        $scope.modalTitle = "Thêm mới khối lượng"
        $scope.type = 3;
        $('#exampleModal').modal('show');
    }

    $scope.addOrigin = () => {
        $scope.modalTitle = "Thêm mới nơi xuất xứ"
        $scope.type = 4;
        $('#exampleModal').modal('show');
    }

    $scope.save = () => {
        var api = "";
        if($scope.type == 1){ // brand
            api = "http://localhost:8080/laclac/brand";
        } else if($scope.type == 2){ //category
            api = "http://localhost:8080/laclac/category";
        } else if($scope.type == 3){ //weight
            api = "http://localhost:8080/laclac/weigth";
            $scope.properties.weight = $scope.properties.name;

        } else if($scope.type == 4){ //origin
            api = "http://localhost:8080/laclac/origin";
            $scope.properties.origin = $scope.properties.name;
        }

        $http.post(api, $scope.properties)
            .then(res => {
                if($scope.type == 1){
                    $scope.brands.push(res.data);
                    $scope.product.brand = res.data;
                } else if($scope.type == 2) {
                    $scope.categories.push(res.data);
                    $scope.product.category = res.data;
                } else if($scope.type == 3) {
                    $scope.weights.push(res.data);
                    $scope.product.weight = res.data;
                } else if($scope.type == 4){
                    $scope.origins.push(res.data);
                    $scope.product.origin = res.data;
                }
                $scope.message = "Đã thêm mới";
                $scope.isSuccess = true;
                alertShow();
                $('#exampleModal').modal('hide');
                $scope.properties.name = '';
            })
            .catch(err => {
                $scope.message = "Lỗi khi thêm";
                $scope.isSuccess = false;
                alertShow();
            })
    }

    getProduct = (apiFilter) => {
        $http.get(apiFilter)
            .then(function (response) {
                $scope.products = response.data;
                $scope.products.forEach((element, index) => {
                    element.quantity = 0;
                    element.sold = 0;
                    element.productDetails.forEach(item => {
                        element.quantity += Number(item.quantity);
                        item.orderDetail.forEach(orderDetail => {
                            element.sold += Number(orderDetail.quantity);
                        })
                    })
                });
                $scope.productsList = $scope.products;
                $scope.isLoading = false;
            })
            .catch(function (error) {
                console.log(error);
                $scope.isLoading = false;
            });
    }
    // lọc các sản phẩm theo brand
    $scope.changeBrandFilter = () => {
        if($scope.brandFilter){
            var apiFilterByBrand = api + "/get-by-brand?brandId=" + $scope.brandFilter
            getProduct(apiFilterByBrand);
        }
    }

    // lọc các sản phẩm theo category
    $scope.changeCategoryFilter = () => {
        if($scope.categoryFilter){
            var apiFilterByCatepory = api + "/get-by-category?categoryId=" + $scope.categoryFilter
            getProduct(apiFilterByCatepory);
        }
    }
    
    //lọc các sản phẩm theo khoảng đã bán
    $scope.filterBySold = () => {
        if($scope.sold){
            if($scope.sold == 1){
                filterBySold(0, 50);
            } else if($scope.sold == 2){
                filterBySold(50, 100);
            } else if($scope.sold == 3){
                filterBySold(100, 200);
            } else if($scope.sold == 4){
                filterBySold(200, 500);
            }
        }
        if($scope.beginSold && $scope.endSold){
            filterBySold($scope.beginSold, $scope.endSold);
        }
    }
    filterBySold = (soldBegin, soldEnd) => {
        $scope.productsList = $scope.products.filter( item => {
            return item.sold >= soldBegin && item.sold <= soldEnd;
        })
    }

    //lọc các sản phẩm theo khoảng tồn kho
    $scope.filterByQuantity = () => {
        if($scope.quantity){
            if($scope.quantity == 1){
                filterByQuantity(0, 50);
            } else if($scope.quantity == 2){
                filterByQuantity(50, 100);
            } else if($scope.quantity == 3){
                filterByQuantity(100, 200);
            } else if($scope.quantity == 4){
                filterByQuantity(200, 500);
            }
        }
        if($scope.beginQuantity && $scope.endQuantity){
            filterBySold($scope.beginQuantity, $scope.endQuantity);
        }
    }

    filterByQuantity = (beginQuantity, endQuantity) => {
        $scope.productsList = $scope.products.filter( item => {
            return item.quantity >= beginQuantity && item.quantity <= endQuantity;
        })
    }

    $scope.filterByPrice = () => {
        if($scope.beginPrice > 1000 && $scope.endPrice > $scope.beginPrice){
            $scope.productsList = $scope.products.filter( item => {
                return item.price >= $scope.beginPrice && item.price <= $scope.endPrice;
            })
        } 
    }

    $scope.resetFilter = () => {
        getAllProduct(api, 0, 10);
        getAllCategories();
        $scope.brandFilter = null;
        $scope.categoryFilter = null;
    }
    
    $('select:not(.filter)').each(function () {
        $(this).select2({
            dropdownParent: $(this).parent()
        });
    });

    $scope.validateName = () => {
        console.log("A");
        $http.get(api + "/find-name?name=" + $scope.product.name )
            .then(res => {
                if(res.data){
                    $scope.showErrName = true;
                } else {
                    $scope.showErrName = false;
                }
            }).catch(err => {})
    }

}