package com.n3t.DTO;

import com.n3t.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class VoucherDto {

    private Integer id;

    private String name;

    private String code;

    private int minMoney;

    private LocalDate beginDate;

    private LocalDate endDate;

    private Integer quantity;

    private Integer promotion;

    private String status;

    private Integer isDelete;

    private User createBy;

    private User updateBy;
}
