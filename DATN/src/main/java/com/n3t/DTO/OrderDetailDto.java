package com.n3t.DTO;

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
public class OrderDetailDto {

    private Integer id;

    private Integer orderId;

    private ProductDto product;

    private ProductDetailDto productDetail;

    private int quantity;

    private int price;

    private Integer status;

}
