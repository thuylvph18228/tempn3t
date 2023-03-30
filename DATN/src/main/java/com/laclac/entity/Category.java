// Generated with g9.

package com.laclac.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.laclac.DTO.CategoryDto;
import com.laclac.DTO.CurrentUser;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity()
@Table(name="categories")
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class Category implements Serializable {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(unique=true, nullable=false, precision=10)
    private Integer id;

    @Column(nullable=false, length=255)
    private String name;

    @Enumerated(EnumType.STRING)
    private Status status;

    @ManyToOne()
    @JoinColumn(name = "create_by", referencedColumnName = "id")
    @JsonIgnore
    private User createBy;

    @ManyToOne
    @JoinColumn(name = "update_by", referencedColumnName = "id")
    private User updateBy;

    @OneToMany(mappedBy = "category")
    @JsonIgnore
    private List<PromotionCategory> promotionCategories;

    @OneToMany(mappedBy = "category")
    @JsonIgnore
    private List<Product> products;

    @OneToMany(mappedBy = "category")
    @JsonIgnore
    private List<BrandCategory> brandCategories;

    public static Category toEntity(CategoryDto dto) {
        Category category = Category.builder()
                .id(dto.getId())
                .name(dto.getName())
                .status(Status.valueOf(dto.getStatus()))
                .createBy(User.builder().id(1).build())
                .updateBy(User.builder().id(1).build())
                .build();
        if(dto.getId() == null){
            category.setCreateBy(CurrentUser.getCurrentUser().get());
        } else {
            category.setId(dto.getId());
            category.setCreateBy(dto.getCreateBy());
            category.setUpdateBy(CurrentUser.getCurrentUser().get());
        }
        return category;
    }

    public CategoryDto toDto() {
        CategoryDto categoryDto = CategoryDto.builder()
                .id(this.id)
                .name(this.name)
                .status(String.valueOf(this.status))
                .createBy(this.createBy != null ? this.createBy : null )
                .updateBy(this.updateBy != null ? this.updateBy : null)
                .build();
        return categoryDto;
    }

}
