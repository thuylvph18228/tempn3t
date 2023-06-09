package com.n3t.service;

import com.n3t.DTO.ProductDto;
import com.n3t.entity.Product;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService {

    Page<Product> getAll(Integer page, Integer size);
    List<Product> topProduct();
    List<ProductDto> getAllByCreatedDate(String date);
    List<ProductDto> getAllByUserId(int userId);
    List<ProductDto> getAllByStatus(String status);
    List<ProductDto> getAllByCategoryId(Integer categoriesId);
    List<ProductDto> getAllByBrandId(Integer brandId);
    List<ProductDto> getAllByBrandIdAndCategoryId(List<Integer> brandIds, List<Integer> categories);
    List<ProductDto> getAllBySex(String sex);
    List<ProductDto> getAllByHeight(List<Integer> height);
    List<ProductDto> getAllBySize(List<Integer> size);
    List<ProductDto> getAllByPrice(int priceStart, int priceEnd);
    List<ProductDto> getAllBy(List<Integer> all);
    ProductDto getById(int ProductId);
    Page<Product> getByName(Integer page, Integer size, String name);
    ProductDto save(ProductDto productDto);
    void delete(int id);

    List<Object> getProduct();

    Product findByName(String name);

}
