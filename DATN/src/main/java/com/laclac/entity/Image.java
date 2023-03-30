// Generated with g9.

package com.laclac.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.laclac.DTO.ImageDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.io.Serializable;

@Entity()
@Table(name="images")
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class Image implements Serializable {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(unique=true, nullable=false, precision=10)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    @JsonIgnore
    private Product product;

    @Column(nullable=false, length=255)
    private String path;

    public static Image toEntity(ImageDto imageDto){
        Image image = Image.builder()
                .product(Product.builder().id(imageDto.getProductId()).build())
                .path(imageDto.getPath())
                .build();
        if(imageDto.getId() != null) {
            image.setId(imageDto.getId());
        }
        return image;
    }

    public ImageDto toDto(){
        return ImageDto.builder()
                .id(this.id)
                .productId(this.product.getId())
                .path(this.path)
                .build();
    }

}
