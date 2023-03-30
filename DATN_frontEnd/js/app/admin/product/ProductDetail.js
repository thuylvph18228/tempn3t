function productDetail ($scope, $http, $routeParams, $rootScope) {
    
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
    
    /**tham so truyen vao */
    $scope.productId = $routeParams.productId;
    const reload = $routeParams.reload;
    if(reload == 1){
        document.location.href = "#admin/product-detail/" + $scope.productId
    }

    $scope.brand = {
        id: "",
        name: "",
    }

    $scope.category = {
        id: "",
        name: "",
    }

    $scope.product = {
        id: $scope.productId,
        code: '',
        name: '',
        avatar: '',
        price: '',
        sex:'',
        brand: null,
        category: $scope.category,
        origin: null,
        weight: null,
        status: '',
        description:'',
        createBy: null,
        updateBy: null,
        createDate: Date.now,
        updateDate: null,
        images: [$scope.image]
    };

    $scope.image = {
        id: '',
        productId: '',
        path: ''
    }

    $scope.size = {
        id: '',
        name: ''
    }

    $scope.color = {
        id: '',
        name: ''
    }

    $scope.height = {
        id: '',
        height: ''
    }

    $scope.material = {
        id: '',
        name: ''
    }

    $scope.productDetail = {
        id: '',
        productId: $scope.productId,
        size: $scope.size,
        color: $scope.color,
        height: $scope.height,
        material: $scope.material,
        quantity: '',
        quantityOrder: ''
    };

    $scope.productDetails = [];
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
    $scope.avatar = '';
    $scope.images = [];
    $scope.listImgProduct = [];

    $scope.isLoading = false;
    $scope.isSuccess = true;
    // $scope.message = '';

    /**hien thi thong bao */
    alertShow = () => {
        $(document).ready(function(){
            $('.toast').toast('show');
        });
    }

    const api = 'http://localhost:8080/laclac/product/detail';
    const apiProduct = "http://localhost:8080/laclac/product/";
    
    $scope.isLoading = true;

    /**get all sizes */
    $http.get("http://localhost:8080/laclac/size")
        .then(function (response) {                    
            $scope.sizes = response.data;
            $scope.isLoading = false;
        })
        .catch(function (error) {
            console.log(error);
            $scope.isLoading = false;
        });

    /**get all materials */
    $http.get("http://localhost:8080/laclac/material")
    .then(function (response) {                    
        $scope.materials = response.data;
        $scope.isLoading = false;
    })
    .catch(function (error) {
        console.log(error);
        $scope.isLoading = false;
    });

    /**get all heights */
    $http.get("http://localhost:8080/laclac/height")
        .then(function (response) {                    
            $scope.heights = response.data;
            $scope.isLoading = false;
        })
        .catch(function (error) {
            console.log(error);
            $scope.isLoading = false;
        });

    /**get all colors */
    $http.get("http://localhost:8080/laclac/color")
    .then(function (response) {                    
        $scope.colors = response.data;
        $scope.isLoading = false;
    })
    .catch(function (error) {
        console.log(error);
        $scope.isLoading = false;
    });

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

    /**get all categories by brandId*/
    function getCategoryByBrandId(brandId){
        // if(brandId){
        //     $http.get("http://localhost:8080/laclac/brand-category" + "/" + brandId)
        //         .then(function (response) {                    
        //             $scope.categories = response.data;
        //             $scope.isLoading = false;
        //         })
        //         .catch(function (error) {
        //             console.log(error);
        //             $scope.isLoading = false;
        //         });
        // }
    }

    /**change brand */
    $scope.changeBrand = function(){
        // getCategoryByBrandId($scope.product.brand.id);
    }

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

        /**get product by id */
    async function getProductByid (){
        await $http.get(apiProduct + $scope.productId)
            .then(function (response) {   
                $scope.product = response.data;  
                $scope.productDetails = $scope.product.productDetails;
                $scope.productDetails.forEach(element => {
                    element.quantityOrder = 0;
                    element.orderDetail.forEach(item => {
                        element.quantityOrder += item.quantity;
                    })
                });
                // console.log($scope.product);
                // getCategoryByBrandId($scope.product.brand.id);
                $scope.isLoading = false;
            })
            .catch(function (error) {
                console.log(error);
                $scope.isLoading = false;
            });
    }
    
    getProductByid();

    /**get all productDetail by product id */
    async function getProductDetailByProductId (){
        await $http.get(api +"/" + $scope.productId)
            .then(function (response) {    
                $scope.productDetails = response.data;
                $scope.isLoading = false;
                $scope.productDetails.map(element => {
                    element.quantityOrder = 0;
                    if(element.orderDetail){
                        element.orderDetail.forEach(item => {
                            element.quantityOrder += item.quantity;
                        })
                    }
                });
            })
            .catch(function (error) {
                console.log(error);
                $scope.isLoading = false;
            });
    }
    getProductDetailByProductId();

/**----------------------------------upload image----------------------------------- */
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
                            if($scope.images[a] == evt.target.result){
                                continue;
                            }
                        }

                        $scope.images.push(evt.target.result); 
                        newImage.path = await uploadImageToFirebase(files[j]);
                        $scope.listImgProduct.push(angular.copy(newImage));
                    }
                });
            }); 
        }        
    };

    /**xoa avatar */
    $scope.deleteAvatar = () => {
        $scope.avatar = "";
        $scope.product.avatar = '';
    }

    /** Xoa image chi tiet*/
    const apiImage = 'http://localhost:8080/laclac/image';
    $scope.deleteImage = (index) => {
        if($scope.product.images[index] && $scope.product.images[index].id){
            $http.delete(apiImage + "/" + $scope.product.images[index].id)
                .then(res => {
    
                })
                .catch(err => {
                    console.log(err);
                })
        }
        $scope.images.splice(index, 1);
        $scope.product.images.splice(index, 1);
    }
/**------------------------------------------------end upload------------------------------------------------ */

/**----------------------------save product-----------------------------------------------*/
    $scope.saveProduct = async () => {
        await $scope.listImgProduct.forEach(item => {
            $scope.product.images.push(angular.copy(item));
        })
        console.log($scope.product);
        $http.post(apiProduct, $scope.product)
            .then(function (response) {                    
                $scope.isLoading = false;
                $scope.isSuccess = true;
                $scope.message = "Cập nhật sản phẩm thành công"
                alertShow();
                $scope.listImgProduct = [];
                $scope.images = [];
                $scope.avatar = '';
                // $scope.product = response.data;
            })
            .catch(function (error) {
                console.log(error);
                $scope.isLoading = false;
                $scope.isSuccess = false;
                alertShow();
                $scope.message = "Có lỗi xảy ra, vui lòng thử lại !"
            });
    }
/**----------------------------end save product-----------------------------------------------*/

    $scope.saveProductDetail = function(event){
        event.preventDefault();
        if(findProductDetail() && !$scope.productDetail.id){
            const quantity = $scope.productDetail.quantity + $scope.productDetailOld.quantity;
            $scope.productDetail = $scope.productDetailOld;
            $scope.productDetail.quantity = quantity;
        } 
        
        $http.post(api +"/" + $scope.productId, $scope.productDetail)
            .then(function (response) {  
                response.data.quantityOrder = 0;
                const result = $scope.productDetails.find(item => {
                    return response.data.id == item.id;
                })
                if(result){
                    $scope.productDetails[$scope.index].quantity = response.data.quantity;
                } else {
                    $scope.productDetails.push(response.data)
                }
                $scope.clearProductDetail();
                $scope.isLoading = false;
                $scope.isSuccess = true;
                alertShow();
                $scope.message = "Lưu sản phẩm thành công"
                getProductDetailByProductId();                
            })
            .catch(function (error) {
                console.log(error);
                $scope.isLoading = false;
                $scope.isSuccess = false;
                alertShow();
                $scope.message = "Có lỗi xảy ra, vui lòng thử lại !"
            });
    }

    $scope.edit = function(index) {
        const item = $scope.productDetails[index];
        $scope.productDetail.id = item.id;
        $scope.productDetail.productId = $scope.productId;
        $scope.productDetail.size = item.size;
        $scope.productDetail.color = item.color;
        $scope.productDetail.material = item.material;
        $scope.productDetail.height = item.height;
        $scope.productDetail.quantity = item.quantity;
        // console.log($scope.productDetail);
        $scope.index = index;
    }

    $scope.delete = function(id, index){
        $http.delete(api +"/" + id)
            .then(function (response) {                    
                $scope.productDetails.splice(index, 1);
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

    $scope.clearProductDetail = function(){
        $scope.productDetail = {
            id: '',
            productId: $scope.productId,
            size: '',
            color: '',
            height: '',
            material: '',
            quantity: ''
        };
    }

    $scope.properties = {
        name: "",
        status: "AVAILABLE"
    };

    $scope.addProperties = () => {
        console.log($scope.productDetail.material);
        if($scope.productDetail.material == 'material'){
            $scope.modalTitle = "Thêm mới chất liệu"
            $scope.type = 1;
            $('#exampleModal').modal('show');
        } else if($scope.productDetail.color == "color"){
            $scope.modalTitle = "Thêm mới màu sắc"
            $scope.type = 2;
            $('#exampleModal').modal('show');
        } else if($scope.productDetail.size == "size"){
            $scope.modalTitle = "Thêm mới size"
            $scope.type = 3;
            $('#exampleModal').modal('show');
        } else if($scope.productDetail.height == "height"){
            $scope.modalTitle = "Thêm mới mới độ cao của đế giày"
            $scope.type = 4;
            $('#exampleModal').modal('show');
        }
    }

    $scope.save = () => {
        var api = "";
        if($scope.type == 1){ // material
            api = "http://localhost:8080/laclac/material";
        } else if($scope.type == 2){ //color
            api = "http://localhost:8080/laclac/color";
        } else if($scope.type == 3){ //size
            api = "http://localhost:8080/laclac/size";
        } else if($scope.type == 4){ //height
            api = "http://localhost:8080/laclac/height";
            $scope.properties.height = $scope.properties.name;
        }

        $http.post(api, $scope.properties)
            .then(res => {
                if($scope.type == 1){
                    $scope.materials.push(res.data);
                    $scope.productDetail.material = res.data;
                } else if($scope.type == 2) {
                    $scope.colors.push(res.data);
                    $scope.productDetail.color = res.data;
                } else if($scope.type == 3) {
                    $scope.sizes.push(res.data);
                    $scope.productDetail.size = res.data;
                } else if($scope.type == 4){
                    $scope.heights.push(res.data);
                    $scope.productDetail.height = res.data;
                }
                $scope.message = "Đã thêm mới";
                $scope.isSuccess = true;
                alertShow();
                // $scope.clearProductDetail();
                $scope.properties.name = "";
                $('#exampleModal').modal('hide');
            })
            .catch(err => {
                $scope.message = "Lỗi khi thêm";
                $scope.isSuccess = false;
                alertShow();
            })
    }

    $scope.cancelAddProperties = () => {
        // $scope.clearProductDetail();
    }

    findProductDetail = () => {
        $scope.productDetailOld = $scope.productDetails.find(item => {
            return item.material.id == $scope.productDetail.material.id && item.color.id == $scope.productDetail.color.id 
                && item.size.id == $scope.productDetail.size.id && item.height.id == $scope.productDetail.height.id
        })
        if($scope.productDetailOld){
            return true
        } else {
            return false;
        }
    }

}