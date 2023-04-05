package com.n3t.DTO;

import com.n3t.entity.Color;
import com.n3t.entity.Height;
import com.n3t.entity.Material;
import com.n3t.entity.Size;
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
