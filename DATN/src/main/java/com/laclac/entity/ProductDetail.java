// Generated with g9.

package com.laclac.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.laclac.DTO.ProductDetailDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.Set;

@Entity()
@Table(name="product_details")
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDetail implements Serializable {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(unique=true, nullable=false, precision=10)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    @JsonIgnore
    private Product product;

    @OneToMany(mappedBy = "productDetail", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<OrderDetail> orderDetail;

    @ManyToOne
    @JoinColumn(name = "size_id", referencedColumnName = "id")
    private Size size;

    @ManyToOne
    @JoinColumn(name = "color_id", referencedColumnName = "id")
    private Color color;

    @ManyToOne
    @JoinColumn(name = "height_id", referencedColumnName = "id")
    private Height height;

    private Integer quantity;

    @ManyToOne
    @JoinColumn(name = "material_id", referencedColumnName = "id")
    private Material material;

    @OneToMany(mappedBy = "productDetail")
    @JsonIgnore
    private List<OrderHistory> orderHistories;

    public static ProductDetail toEntity(ProductDetailDto productDetailDto){
        ProductDetail productDetail =  ProductDetail.builder()
                .product(Product.builder().id(productDetailDto.getProductId()).build())
                .size(Size.builder().id(productDetailDto.getSize().getId()).build())
                .color(Color.builder().id(productDetailDto.getColor().getId()).build())
                .height(Height.builder().id(productDetailDto.getHeight().getId()).build())
                .material(Material.builder().id(productDetailDto.getMaterial().getId()).build())
                .quantity(productDetailDto.getQuantity())
                .build();
        if(productDetailDto.getId() != null){
            productDetail.setId(productDetailDto.getId());
        }
        return productDetail;
    }

    public ProductDetailDto toDto() {
        ProductDetailDto productDetailDto = ProductDetailDto.builder()
                .id(this.id)
                .size(this.size)
                .color(this.color)
                .height(this.height)
                .quantity(this.quantity)
                .material(this.material)
                .build();
        if(this.product == null){
        }else {
            productDetailDto.setProductId(this.product.getId());
        }
        return productDetailDto;
    }

}
