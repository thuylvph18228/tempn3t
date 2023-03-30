package com.laclac.DTO;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.laclac.entity.Order;
import com.laclac.entity.Product;
import com.laclac.entity.ProductDetail;
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
