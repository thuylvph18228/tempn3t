package com.laclac.DTO;

import com.laclac.entity.Brand;
import com.laclac.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class BrandCategoryDto {

    private Integer id;

    private Brand brand;

    private Category category;
}
