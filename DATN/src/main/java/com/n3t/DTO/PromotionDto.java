package com.n3t.DTO;

import com.n3t.entity.PromotionBlacklist;
import com.n3t.entity.PromotionCategory;
import com.n3t.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class PromotionDto {

    private Integer id;

    private String name;

    private Integer quantity;

    private LocalDate beginDate;

    private LocalDate endDate;

    private String status;

    private User createBy;

    private User updateBy;

    private List<PromotionCategory> promotionCategories;

    private List<PromotionBlacklist> promotionBlacklists;

}
