export function getAllBrand(api){
    const brands = [];
    fetch(api)
        .then(function (response) {
            brands = response.data;
        })
        .catch(function () {
            console.log('Booo');
        });
    return brands;
}