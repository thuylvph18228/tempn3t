package com.n3t.DTO;
import com.n3t.entity.Category;
import com.n3t.entity.Promotion;
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
public class PromotionCategoryDto {
    private Integer id;

    private Promotion promotion;

    private Category category;

}
