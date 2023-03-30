function properties_product($scope, $http, $rootScope) {
    
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

    $scope.size = {
        id: '',
        name: '',
    };

    $scope.color = {
        id: '',
        name: '',
    };
    $scope.material = {
        id: '',
        name: '',
    };

    $scope.height = {
        id: '',
        height: '',
    };
    $scope.weight = {
        id: '',
        weight: '',
    };

    $scope.origin = {
        id: '',
        origin: '',
    };
    $scope.sizes = [];
    $scope.colors = [];
    $scope.materials = [];
    $scope.heights = [];
    $scope.weights = [];
    $scope.origins = [];
    $scope.isLoading = false;
    $scope.isSuccess = true;
    $scope.message = "";
    $scope.index = '';

    /*hien thi thong bao */
    alertShow = () => {
        $(document).ready(function () {
            $('.toast').toast('show');
        });
    }

    const apiSize = 'http://localhost:8080/laclac/size';
    const apiColor = 'http://localhost:8080/laclac/color';
    const apiMaterial = 'http://localhost:8080/laclac/material';
    const apiHeight = 'http://localhost:8080/laclac/height';
    const apiWeight = 'http://localhost:8080/laclac/weight';
    const apiOrigin = 'http://localhost:8080/laclac/origin';
    $scope.isLoading = true;
    getAllSize = () => {
        $http.get(apiSize) // Gửi request dạng GET lên API lấy tất cả danh sách size
            .then(function (response) {
                $scope.isLoading = false;
                $scope.sizes = response.data;
            })
            .catch(function (error) {
                console.log(error);
                $scope.isLoading = false;
            });
    }
    getAllSize();

    getAllColor = () => { 
        $http.get(apiColor) // Gửi request dạng GET lên API lấy tất cả danh sách color
            .then(function (response) {
                $scope.isLoading = false;
                $scope.colors = response.data;
            })
            .catch(function (error) {
                console.log(error);
                $scope.isLoading = false;
            });
    }
    getAllColor();


    getAllMaterial = () => { 
        $http.get(apiMaterial) // Gửi request dạng GET lên API lấy tất cả danh sách material
            .then(function (response) {
                $scope.isLoading = false;
                $scope.materials = response.data;
            })
            .catch(function (error) {
                console.log(error);
                $scope.isLoading = false;
            });
    }
    getAllMaterial();

    getAllHeight = () => { 
        $http.get(apiHeight) // Gửi request dạng GET lên API lấy tất cả danh sách height
            .then(function (response) {
                $scope.isLoading = false;
                $scope.heights = response.data;
            })
            .catch(function (error) {
                console.log(error);
                $scope.isLoading = false;
            });
    }
    getAllHeight();

    getAllWeight = () => { 
        $http.get(apiWeight) // Gửi request dạng GET lên API lấy tất cả danh sách weight
            .then(function (response) {
                $scope.isLoading = false;
                $scope.weights = response.data;
            })
            .catch(function (error) {
                console.log(error);
                $scope.isLoading = false;
            });
    }
    getAllWeight();

    getAllOrigin = () => { 
        $http.get(apiOrigin) // Gửi request dạng GET lên API lấy tất cả danh sách origin
            .then(function (response) {
                $scope.isLoading = false;
                $scope.origins = response.data;
    
            })
            .catch(function (error) {
                console.log(error);
                $scope.isLoading = false;
            });
    }
    getAllOrigin();

    /*lưu size */
    $scope.isLoading = true;
    $scope.saveSize = () => {
        $http.post(apiSize, $scope.size)
            .then(function (response) {
                // Thông báo thành công                        
                $scope.isLoading = false;
                $scope.isSuccess = true;
                $scope.message = "Lưu size thành công"
                alertShow();
                $scope.sizes.push(response.data);
            }).catch(function (error) {
                console.log(error);
                $scope.isLoading = false;
                $scope.isSuccess = false;
                $scope.message = "Có lỗi xảy ra, vui lòng thử lại !"
                alertShow();
            });
        clear();
    }

    $scope.updateSize = () => {
        $http.post(apiSize, $scope.size)
            .then(function (response) {
                // Thông báo thành công                        
                $scope.isLoading = false;
                $scope.isSuccess = true;
                $scope.message = "Cập nhật size thành công"
                alertShow();
                $scope.sizes[$scope.index] = response.data;

            }).catch(function (error) {
                console.log(error);
                $scope.isLoading = false;
                $scope.isSuccess = false;
                $scope.message = "Có lỗi xảy ra, vui lòng thử lại !"
                alertShow();
            });
        clear();
    }

    $scope.cancelSize = () => {
        getAllSize();
        getAllColor();
        getAllHeight();
        getAllMaterial();
        getAllOrigin();
        getAllWeight();
        clear();
    }

    $scope.isLoading = true;
    $scope.deleteSize = function (idSize, index) {
        $http.delete(apiSize + "/" + idSize)
            .then(function (response) {
                $scope.sizes.splice(index, 1);
            }).catch(function (error) {
                console.log(error);
            });
        clear();
    }

    $scope.editSize = (size, index) => {
        $scope.size = size;
        $scope.size.name = Number($scope.size.name);
        $scope.index = index;
    }

    $scope.clear = () => {
        clear();
    }

    clear = () => {
        $scope.index = -1;
        $scope.size = {
            id: '',
            name: ''
        };
        $scope.color = {
            id: '',
            name: ''
        };
        $scope.material = {
            id: '',
            name: ''
        };
        $scope.height = {
            id: '',
            name: ''
        };
        $scope.weight = {
            id: '',
            name: ''
        };
        $scope.origin = {
            id: '',
            name: ''
        };
    };

    // lưu color
    $scope.isLoading = true;
    $scope.saveColor = () => {
        $http.post(apiColor, $scope.color)
            .then(function (response) {
                // Thông báo thành công                        
                $scope.isLoading = false;
                $scope.isSuccess = true;
                $scope.message = "Lưu color thành công"
                alertShow();
                $scope.colors.push(response.data);
                console.log(response.data);
            }).catch(function (error) {
                console.log(error);
                $scope.isLoading = false;
                $scope.isSuccess = false;
                $scope.message = "Có lỗi xảy ra, vui lòng thử lại !"
                alertShow();
            });
        clear();
    }

    $scope.updateColor = () => {
        $http.post(apiColor, $scope.color)
            .then(function (response) {
                // Thông báo thành công                        
                $scope.isLoading = false;
                $scope.isSuccess = true;
                $scope.message = "Cập nhật size thành công"
                alertShow();
                $scope.colors[$scope.index] = response.data;

            }).catch(function (error) {
                console.log(error);
                $scope.isLoading = false;
                $scope.isSuccess = false;
                $scope.message = "Có lỗi xảy ra, vui lòng thử lại !"
                alertShow();
            });
        clear();

    }

    $scope.isLoading = true;
    $scope.deleteColor = function (idColor, index) {
        $http.delete(apiColor + "/" + idColor)
            .then(function (response) {
                $scope.colors.splice(index, 1);
            }).catch(function (error) {
                console.log(error);
            });
        clear();
    }

    $scope.editColor = (color, index) => {
        $scope.color = color;
        $scope.index = index;
    }

    /**lưu material */
    $scope.isLoading = true;
    $scope.saveMaterial = () => {
        $http.post(apiMaterial, $scope.material)
            .then(function (response) {
                // Thông báo thành công                        
                $scope.isLoading = false;
                $scope.isSuccess = true;
                $scope.message = "Lưu material thành công"
                alertShow();
                $scope.materials.push(response.data);
            }).catch(function (error) {
                console.log(error);
                $scope.isLoading = false;
                $scope.isSuccess = false;
                $scope.message = "Có lỗi xảy ra, vui lòng thử lại !"
                alertShow();
            });
        clear();
    }

    $scope.updateMaterial = () => {
        $http.post(apiMaterial, $scope.material)
            .then(function (response) {
                // Thông báo thành công                        
                $scope.isLoading = false;
                $scope.isSuccess = true;
                $scope.message = "Cập nhật material thành công"
                alertShow();
                $scope.materials[$scope.index] = response.data;

            }).catch(function (error) {
                console.log(error);
                $scope.isLoading = false;
                $scope.isSuccess = false;
                $scope.message = "Có lỗi xảy ra, vui lòng thử lại !"
                alertShow();
            });
        clear();

    }

    $scope.isLoading = true;
    $scope.deleteMaterial = function (idMaterial, index) {
        $http.delete(apiMaterial + "/" + idMaterial)
            .then(function (response) {
                $scope.materials.splice(index, 1);
            }).catch(function (error) {
                console.log(error);
            });
        clear();
    }

    $scope.editMaterial = (material, index) => {
        $scope.material = material;
        $scope.index = index;
    }

    $scope.clear = () => {
        clear();
    }

    // lưu height
    $scope.isLoading = true;
    $scope.saveHeight = () => {
        $http.post(apiHeight, $scope.height)
            .then(function (response) {
                // Thông báo thành công                        
                $scope.isLoading = false;
                $scope.isSuccess = true;
                $scope.message = "Lưu height thành công"
                alertShow();
                $scope.heights.push(response.data);
            }).catch(function (error) {
                console.log(error);
                $scope.isLoading = false;
                $scope.isSuccess = false;
                $scope.message = "Có lỗi xảy ra, vui lòng thử lại !"
                alertShow();
            });
        clear();
    }

    $scope.updateHeight = () => {
        $http.post(apiHeight, $scope.height)
            .then(function (response) {
                // Thông báo thành công                        
                $scope.isLoading = false;
                $scope.isSuccess = true;
                $scope.message = "Cập nhật size thành công"
                alertShow();
                $scope.heights[$scope.index] = response.data;

            }).catch(function (error) {
                console.log(error);
                $scope.isLoading = false;
                $scope.isSuccess = false;
                $scope.message = "Có lỗi xảy ra, vui lòng thử lại !"
                alertShow();
            });
        clear();

    }

    $scope.isLoading = true;
    $scope.deleteHeight = function (idHeight, index) {
        $http.delete(apiHeight + "/" + idHeight)
            .then(function (response) {
                $scope.heights.splice(index, 1);
            }).catch(function (error) {
                console.log(error);
            });
        clear();
    }

    $scope.editHeight = (height, index) => {
        $scope.height = height;
        $scope.index = index;
    }

    /**lưu weight */
    $scope.isLoading = true;
    $scope.saveWeight = () => {
        $http.post(apiWeight, $scope.weight)
            .then(function (response) {
                // Thông báo thành công                        
                $scope.isLoading = false;
                $scope.isSuccess = true;
                $scope.message = "Lưu weight thành công"
                alertShow();
                $scope.weights.push(response.data);
            }).catch(function (error) {
                console.log(error);
                $scope.isLoading = false;
                $scope.isSuccess = false;
                $scope.message = "Có lỗi xảy ra, vui lòng thử lại !"
                alertShow();
            });
        clear();
    }

    $scope.updateWeight = () => {
        $http.post(apiWeight, $scope.weight)
            .then(function (response) {
                // Thông báo thành công                        
                $scope.isLoading = false;
                $scope.isSuccess = true;
                $scope.message = "Cập nhật weight thành công"
                alertShow();
                $scope.weights[$scope.index] = response.data;

            }).catch(function (error) {
                console.log(error);
                $scope.isLoading = false;
                $scope.isSuccess = false;
                $scope.message = "Có lỗi xảy ra, vui lòng thử lại !"
                alertShow();
            });
        clear();

    }

    $scope.isLoading = true;
    $scope.deleteWeight = function (idWeight, index) {
        $http.delete(apiWeight + "/" + idWeight)
            .then(function (response) {
                $scope.weights.splice(index, 1);
            }).catch(function (error) {
                console.log(error);
            });
        clear();
    }

    $scope.editWeight = (weight, index) => {
        $scope.weight = weight;
        $scope.index = index;
    }

    $scope.clear = () => {
        clear();
    }

    // lưu origin
    $scope.isLoading = true;
    $scope.saveOrigin = () => {
        $http.post(apiOrigin, $scope.origin)
            .then(function (response) {
                // Thông báo thành công                        
                $scope.isLoading = false;
                $scope.isSuccess = true;
                $scope.message = "Lưu origin thành công"
                alertShow();
                $scope.origins.push(response.data);
            }).catch(function (error) {
                console.log(error);
                $scope.isLoading = false;
                $scope.isSuccess = false;
                $scope.message = "Có lỗi xảy ra, vui lòng thử lại !"
                alertShow();
            });
        clear();
    }

    $scope.updateOrigin = () => {
        $http.post(apiOrigin, $scope.origin)
            .then(function (response) {
                // Thông báo thành công                        
                $scope.isLoading = false;
                $scope.isSuccess = true;
                $scope.message = "Cập nhật size thành công"
                alertShow();
                $scope.origins[$scope.index] = response.data;

            }).catch(function (error) {
                console.log(error);
                $scope.isLoading = false;
                $scope.isSuccess = false;
                $scope.message = "Có lỗi xảy ra, vui lòng thử lại !"
                alertShow();
            });
        clear();

    }

    $scope.isLoading = true;
    $scope.deleteOrigin = function (idOrigin, index) {
        $http.delete(apiOrigin + "/" + idOrigin)
            .then(function (response) {
                $scope.origins.splice(index, 1);
            }).catch(function (error) {
                console.log(error);
            });
        clear();
    }

    $scope.editOrigin = (origin, index) => {
        $scope.origin = origin;
        $scope.index = index;
    }
}
