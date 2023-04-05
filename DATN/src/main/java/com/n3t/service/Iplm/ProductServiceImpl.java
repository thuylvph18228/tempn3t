package com.n3t.service.Iplm;

import com.n3t.DTO.ImageDto;
import com.n3t.DTO.ProductDto;
import com.n3t.entity.Product;
import com.n3t.repository.ProductRepository;
import com.n3t.service.ImageService;
import com.n3t.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ImageService imageService;

    @Override
    @Transactional
    public Page<Product> getAll(Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> products = this.productRepository.findAll(pageable);
        return products;
    }

    @Override
    @Transactional
    public List<ProductDto> getAllByCreatedDate(String date) {
        return null;
    }

    @Override
    @Transactional
    public List<ProductDto> getAllByUserId(int userId) {
        return null;
    }

    @Override
    @Transactional
    public List<ProductDto> getAllByStatus(String status) {
        return null;
    }

    @Override
    @Transactional
    public List<ProductDto> getAllByCategoryId(Integer categoryId) {
        return this.productRepository.findByCategoryId(categoryId).stream().map(Product :: toDto).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<ProductDto> getAllByBrandId(Integer brandId) {
        return this.productRepository.findByBrandId(brandId).stream().map(Product :: toDto).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<ProductDto> getAllByBrandIdAndCategoryId(List<Integer> brandIds, List<Integer> categories) {
        return null;
    }

    @Override
    @Transactional
    public List<ProductDto> getAllBySex(String sex) {
        return null;
    }

    @Override
    @Transactional
    public List<ProductDto> getAllByHeight(List<Integer> height) {
        return null;
    }

    @Override
    @Transactional
    public List<ProductDto> getAllBySize(List<Integer> size) {
        return null;
    }

    @Override
    @Transactional
    public List<ProductDto> getAllByPrice(int priceStart, int priceEnd) {
        return null;
    }

    @Override
    @Transactional
    public List<ProductDto> getAllBy(List<Integer> all) {
//        return this.productRepository.finByAll(all);
        return null;
    }

    @Override
    @Transactional
    public ProductDto getById(int ProductId) {
        Product p = this.productRepository.findById(ProductId).get();
        ProductDto productDto = this.productRepository.findById(ProductId).get().toDto();
        return productDto;
    }

    @Override
    public Page<Product> getByName(Integer page, Integer size, String name) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> products = this.productRepository.findByNameStartingWith(name, pageable);
        return products;
    }

    @Override
    @Transactional
    public ProductDto save(ProductDto productDto) {
        ProductDto newProductDto = this.productRepository.save(Product.toEntity(productDto)).toDto();

        List<ImageDto> listImage = productDto.getImages();
        for(int i = 0; i < productDto.getImages().size(); i++){
            listImage.get(i).setProductId(newProductDto.getId());
        }

        List<ImageDto> imageDtos = this.imageService.saveAll(listImage);
        newProductDto.setImages(imageDtos);
        return newProductDto;
    }

    @Override
    @Transactional
    public void delete(int id) {
        this.productRepository.deleteById(id);
    }

    @Override
    public List<Object> getProduct() {
        return this.productRepository.getProduct();
    }

    @Override
    public Product findByName(String name){
        return this.productRepository.findByName(name);
    }
}
