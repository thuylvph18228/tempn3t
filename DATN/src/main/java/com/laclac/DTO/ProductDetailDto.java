package com.laclac.DTO;

import com.laclac.entity.Color;
import com.laclac.entity.Height;
import com.laclac.entity.Material;
import com.laclac.entity.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDetailDto {

    private Integer id;

    private Integer productId;

    private Size size;

    private Color color;

    private Height height;

    private Integer quantity;

    private Material material;
}
