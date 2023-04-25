package com.n3t.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.io.Serializable;

@Entity()
@Table(name="promotion_categories")
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class PromotionCategory implements Serializable {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(unique=true, nullable=false, precision=10)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "promotion_id", referencedColumnName = "id")
    @JsonIgnoreProperties("promotionCategories")
    private Promotion promotion;

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    @JsonIgnoreProperties("promotionCategories")
    private Category category;
}
