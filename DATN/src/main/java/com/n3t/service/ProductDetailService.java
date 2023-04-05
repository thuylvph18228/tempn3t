package com.n3t.service;

import com.n3t.DTO.ProductDetailDto;
import com.n3t.entity.ProductDetail;

import java.util.List;

public interface ProductDetailService {
    List<ProductDetail> getAll();
    List<ProductDetail> getAllByProductId(int productId);
    ProductDetail getById(int ProductDetailId);
    ProductDetail save(ProductDetailDto productDetailDto);
    ProductDetail update(ProductDetail productDetail);
    void delete(int id);

    List<Object> checkQuantity(Integer id, Integer quantity);
}
