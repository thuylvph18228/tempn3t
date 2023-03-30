package com.laclac.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.laclac.DTO.BrandCategoryDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Entity()
@Table(name="brand_category")
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class BrandCategory {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(unique=true, nullable=false, precision=10)
    private Integer id;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "brand_id", referencedColumnName = "id")
    private Brand brand;

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private Category category;

    public static BrandCategory toEndtity(BrandCategoryDto brandCategoryDto) {
        return BrandCategory.builder()
                .id(brandCategoryDto.getId())
                .brand(brandCategoryDto.getBrand())
                .category(brandCategoryDto.getCategory())
                .build();
    }

}
