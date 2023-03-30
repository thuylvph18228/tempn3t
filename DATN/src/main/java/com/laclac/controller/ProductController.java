package com.laclac.controller;

import com.laclac.DTO.OrderDto;
import com.laclac.DTO.ProductDto;
import com.laclac.entity.Order;
import com.laclac.entity.Product;
import com.laclac.repository.ProductRepository;
import com.laclac.service.ProductService;
import org.omg.CORBA.portable.ResponseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/laclac/product")
@CrossOrigin("*")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private ProductRepository productRepo;

    @GetMapping
    public ResponseEntity getAll(){
        return ResponseEntity.ok(this.productRepo.findAll().stream().map(Product :: toDto).collect(Collectors.toList()));
    }
    @GetMapping("/index")
    public ResponseEntity<?> getAllProduct(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size
    ){
        Page<Product> products = this.productService.getAll(page, size);
        Long totalProduct = products.getTotalElements();
        List<ProductDto> list = products.stream().map(Product::toDto).collect(Collectors.toList());
        Integer allPage = products.getTotalPages();
        List<Object> object = new ArrayList<>();
        object.add(list);
        object.add(allPage);
        object.add(totalProduct);
        return ResponseEntity.ok(object);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAllById(@PathVariable("id") Integer id){
        return ResponseEntity.ok( this.productService.getById(id));
    }

    @GetMapping("/get-by-status")
    public ResponseEntity<?> getAllByStatus(String status){
        return ResponseEntity.ok( this.productService.getAllByStatus(status));
    }

    @GetMapping("/get-by-category")
    public ResponseEntity<?> getAllByCategoryId(@RequestParam("categoryId") String categoryId){
        return ResponseEntity.ok( this.productService.getAllByCategoryId(Integer.parseInt(categoryId)));
    }

    @GetMapping("/get-by-brand")
    public ResponseEntity<?> getAllByBrandId(@RequestParam("brandId") String brandId){
        return ResponseEntity.ok( this.productService.getAllByBrandId(Integer.parseInt(brandId)));
    }

    @GetMapping("/get-by-brand-and-category")
    public ResponseEntity<?> getByBrandAndCategory(List<Integer> listBrand, List<Integer> listCategory){
        return ResponseEntity.ok( this.productService.getAllByBrandIdAndCategoryId(listBrand, listCategory));
    }

    @GetMapping("/get-by-sex")
    public ResponseEntity<?> getAllBySex(String sex){
        return ResponseEntity.ok( this.productService.getAllBySex(sex));
    }

    @GetMapping("/get-by-height")
    public ResponseEntity<?> getAllByHeight(List<Integer> height){
        return ResponseEntity.ok( this.productService.getAllByHeight(height));
    }

    @GetMapping("/get-by-size")
    public ResponseEntity<?> getAllBySize(List<Integer> size){
        return ResponseEntity.ok( this.productService.getAllBySize(size));
    }

    @GetMapping("/get-by-price")
    public ResponseEntity<?> getAllByPrice(int priceStart, int priceEnd){
        return ResponseEntity.ok(this.productService.getAllByPrice(priceStart, priceEnd));
    }

    @GetMapping("/get-by-all")
    public ResponseEntity<?> getAllByAll(@RequestBody List<Integer> listId){
        return ResponseEntity.ok( this.productService.getAllBy(listId));
    }

    @GetMapping("/get-by-name/{name}")
    public ResponseEntity<?> getAllByName(
            @PathVariable("name") String name,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size
    ){
        Page<Product> products = this.productService.getByName(page, size, name);
        List<ProductDto> list = products.stream().map(Product::toDto).collect(Collectors.toList());
        Integer allPage = products.getTotalPages();
        List<Object> object = new ArrayList<>();
        object.add(list);
        object.add(allPage);
        return ResponseEntity.ok(object);
    }

    @PostMapping()
    public ResponseEntity<?> save(@RequestBody ProductDto productDto){
        return ResponseEntity.ok(this.productService.save(productDto));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Integer id){
        this.productService.delete(id);
    }

    @PostMapping("/get-page")
    Page<Product> getPage(@RequestBody ProductDto dto) {
        return productRepo.getPage(
                PageRequest.of(dto.getPageIndex(), dto.getPageSize()),
                dto.getColor(),
                dto.getFormPrice(),
                dto.getToPrice(),
                dto.getHeight(),
                dto.getSize(),
               dto.getCategoryId()
        );
    }

    @GetMapping("/find-name")
    public ResponseEntity findByName(@RequestParam("name") String name){
        return ResponseEntity.ok(this.productService.findByName(name));
    }

}
