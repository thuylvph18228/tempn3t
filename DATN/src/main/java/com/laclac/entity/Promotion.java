// Generated with g9.

package com.laclac.entity;

import com.laclac.DTO.CurrentUser;
import com.laclac.DTO.PromotionDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Entity()
@Table(name="promotions")
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class Promotion implements Serializable {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(unique=true, nullable=false, precision=10)
    private Integer id;

    @Column(nullable=false, length=255)
    private String name;

    @Column(nullable=false, precision=10)
    private int quantity;

    @Column(name="begin_date", nullable=false)
    private LocalDate beginDate;

    @Column(name="end_date", nullable=false)
    private LocalDate endDate;

    @Enumerated(EnumType.STRING)
    private Status status;

    @ManyToOne
    @JoinColumn(name = "create_by", referencedColumnName = "id")
    private User createBy;

    @ManyToOne
    @JoinColumn(name = "update_by", referencedColumnName = "id")
    private User updateBy;

    @OneToMany(mappedBy = "promotion")
    private List<PromotionCategory> promotionCategories;

    @OneToMany(mappedBy = "promotion")
    private List<PromotionBlacklist> promotionBlacklists;

    public static Promotion toEntity(PromotionDto promotionDto) {
        Promotion promotion = Promotion.builder()
                .name(promotionDto.getName())
                .quantity(promotionDto.getQuantity())
                .beginDate(promotionDto.getBeginDate())
                .endDate(promotionDto.getEndDate())
                .status(Status.valueOf(promotionDto.getStatus()))
                .updateBy(promotionDto.getId() != null ? CurrentUser.getCurrentUser().get() : null)
                .build();
        if(promotionDto.getId() != null){
            promotion.setId(promotionDto.getId());
            promotion.setCreateBy(promotionDto.getCreateBy());
        } else {
            promotion.setCreateBy(CurrentUser.getCurrentUser().get());
        }
        return promotion;
    }

    public PromotionDto toDto() {
        return PromotionDto.builder()
                .id(this.id)
                .name(this.name)
                .quantity(this.quantity)
                .beginDate(this.beginDate)
                .endDate(this.endDate)
                .status(this.status.toString())
                .createBy(this.createBy)
                .updateBy(this.updateBy)
                .promotionCategories(this.promotionCategories)
                .promotionBlacklists(this.promotionBlacklists)
                .build();
    }

}
