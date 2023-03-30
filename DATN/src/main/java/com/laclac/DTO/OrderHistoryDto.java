package com.laclac.DTO;

import com.laclac.entity.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class OrderHistoryDto {

    private Integer id;

    private String action;

    private Integer quantity;

    private String description;

    private String status;

    private User createBy;

    private User updateBy;

    private LocalDateTime createdDate;

    private Integer orderId;

    private ProductDetailDto productDetail;

    private OrderDetailDto orderDetail;

}
