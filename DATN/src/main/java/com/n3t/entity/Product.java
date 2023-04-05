// Generated with g9.

package com.n3t.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.n3t.DTO.CurrentUser;
import com.n3t.DTO.ProductDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Entity()
@Table(name="products")
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class Product implements Serializable {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(unique=true, nullable=false, precision=10)
    private Integer id;

    @Column( length=255)
    private String code;

    @Column(nullable=false, length=255)
    private String name;

    @Column(nullable=false, precision=10)
    private int price;

    @Column(nullable=false, precision=10)
    private int listed_price;
    @Column(name = "image", length=255)
    private String avatar;

    @Enumerated(EnumType.STRING)
    private Sex sex;

    @Column( length=255)
    private String description;

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private Category category;

    @ManyToOne()
    @JoinColumn(name = "brand_id", referencedColumnName = "id")
    private Brand brand;

    @ManyToOne
    @JoinColumn(name = "weight_id", referencedColumnName = "id")
    private Weight weight;

    @ManyToOne
    @JoinColumn(name = "origin_id", referencedColumnName = "id")
    private Origin origin;

    @Column(name = "created_date" , nullable=false)
    private LocalDateTime createdDate;

    @Column(nullable=true, name = "update_date")
    private LocalDateTime updateDate;

    @ManyToOne()
    @JoinColumn(name = "create_by", referencedColumnName = "id")
    private User createBy;

    @ManyToOne()
    @JoinColumn(name = "update_by", referencedColumnName = "id")
    private User updateBy;

    @Enumerated(EnumType.STRING)
    private ProductStatus status;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    @JsonManagedReference(value="product")
    private List<OrderDetail> orderDetails;

    @OneToMany(mappedBy = "product")
    private List<ProductDetail> productDetails;

    @OneToMany(mappedBy = "product")
    private List<Image> images;

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private List<Feedback> feedbacks;

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private List<PromotionBlacklist> promotionBlacklists;

    /**
     * To entity
     */
    public static Product toEntity(ProductDto dto) {
         Product product = Product.builder()
                .name(dto.getName())
                .price(dto.getPrice())
                .listed_price(dto.getListed_price())
                .avatar(dto.getAvatar())
                .sex(Sex.valueOf(dto.getSex()))
                .updateDate(dto.getUpdateDate())
                .description(dto.getDescription())
                .category(Category.builder().id(dto.getCategory().getId()).build())
                .brand(Brand.builder().id(dto.getBrand().getId()).build())
                .weight(Weight.builder().id(dto.getWeight().getId()).build())
                .origin(Origin.builder().id(dto.getOrigin().getId()).build())
                .status(ProductStatus.valueOf(dto.getStatus()))
                .build();
        if(dto.getId() == null){
            int code = (int)((Math.random() + 1) * 10000000);
            product.setCode(code + "");
            product.setCreateBy(CurrentUser.getCurrentUser().get());
            product.setCreatedDate(LocalDateTime.now());
        } else {
            product.setId(dto.getId());
            product.setCode(dto.getCode());
            product.setCreatedDate(dto.getCreateDate());
            product.setUpdateDate(LocalDateTime.now());
            product.setCreateBy(dto.getCreateBy());
//            product.setUpdateBy(CurrentUser.getCurrentUser().get() != null ? CurrentUser.getCurrentUser().get() : null);
        }
        return product;
    }

    /**
     * to dto
     */
    public ProductDto toDto(){
        ProductDto productDto = ProductDto.builder()
                .id(this.id)
                .code(this.code)
                .name(this.name)
                .price(this.price)
                .listed_price(this.listed_price)
                .avatar(this.avatar)
                .sex(this.sex != null ? this.sex.toString() : null)
                .description(this.description)
                .brand(this.brand != null ? this.brand : null)
                .category(this.category != null ? this.category : null)
                .weight(this.weight != null ? this.weight : null )
                .origin(this.origin != null ? this.origin : null)
                .createDate(this.createdDate)
                .updateDate(this.updateDate)
                .createBy(this.createBy != null ? this.createBy : null )
                .status(this.status != null ? this.status.toString() : null)
                .images(this.images != null ? this.images.stream().map(Image::toDto).collect(Collectors.toList()) : null)
                .productDetails(this.productDetails != null ? this.productDetails : null)
                .build();
        if(this.updateBy != null) {
            productDto.setUpdateBy(this.updateBy);
        }
        return productDto;
    }

}
