// Generated with g9.

package com.laclac.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.laclac.DTO.BrandDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity()
@Table(name="brands")
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class Brand implements Serializable {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(unique=true, nullable=false, precision=10)
    private Integer id;

    @Column(nullable=false, length=255)
    private String name;

    @Enumerated(EnumType.STRING)
    private Status status;

    @OneToMany(mappedBy = "brand")
    private List<BrandCategory> brandCategories;

    @OneToMany(mappedBy = "brand")
    @JsonIgnore
    private List<Product> products;

    public static Brand toEntity(BrandDto dto) {
        return Brand.builder()
                .id(dto.getId())
                .name(dto.getName())
                .status(Status.valueOf(dto.getStatus()))
                .build();
    }

    public BrandDto toDto() {
        BrandDto brandDto = BrandDto.builder()
                .id(this.id)
                .name(this.name)
                .status(String.valueOf(this.status))
                .build();

        return brandDto;
    }
}
