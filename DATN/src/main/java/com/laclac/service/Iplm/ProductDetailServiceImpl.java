package com.laclac.service.Iplm;

import com.laclac.DTO.ProductDetailDto;
import com.laclac.entity.ProductDetail;
import com.laclac.repository.ProductDetailRepository;
import com.laclac.service.ProductDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductDetailServiceImpl implements ProductDetailService {

    @Autowired
    private ProductDetailRepository productDetailRepo;

    @Override
    @Transactional
    public List<ProductDetail> getAll() {
        return null;
    }

    @Override
    @Transactional
    public List<ProductDetail> getAllByProductId(int productId) {
        return this.productDetailRepo.getAllByProductId(productId);
    }

    @Override
    @Transactional
    public ProductDetail getById(int ProductDetailId) {
        return null;
    }

    @Override
    @Transactional
    public ProductDetail save(ProductDetailDto productDetailDto) {
        return this.productDetailRepo.save(ProductDetail.toEntity(productDetailDto));
    }

    @Override
    @Transactional
    public ProductDetail update(ProductDetail productDetail) {
        return null;
    }

    @Override
    @Transactional
    public void delete(int id) {
        this.productDetailRepo.deleteById(id);
    }

    @Override
    public List<Object> checkQuantity(Integer id, Integer quantity) {
        ProductDetail productDetail = this.productDetailRepo.findById(id).get();
        List<Object> list = new ArrayList<>();
        list.add(productDetail.getQuantity());
        if(productDetail.getQuantity() < quantity){
            list.add(false);
        } else {
            list.add(true);
        }
        return list;
    }
}
