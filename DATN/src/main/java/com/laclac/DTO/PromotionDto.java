package com.laclac.DTO;

import com.laclac.entity.PromotionBlacklist;
import com.laclac.entity.PromotionCategory;
import com.laclac.entity.Status;
import com.laclac.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
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
