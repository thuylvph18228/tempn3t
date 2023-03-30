package com.laclac.DTO;

import com.laclac.entity.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.Column;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {

    private Integer id;

    private String code;

    private String codeGHN;

    private LocalDateTime createdDate;

    private LocalDateTime updateDate;

    private String customerName;

    private String phone;

    private String address;

    private String province;

    private String district;

    private String ward;

    private String description;

    private String orderType;

    private String paymentType;

    private Voucher voucher;

    private String status;

    private User createBy;

    private User updateBy;

    private List<OrderDetailDto> orderDetails;

    private List<OrderHistoryDto> orderHistories;

    private Integer totalMoney;

    private Integer isPay;
}
