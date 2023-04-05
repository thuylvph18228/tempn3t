package com.n3t.DTO;


import com.n3t.entity.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {

    private Integer id;

    private String code;

    private String name;

    private int price;

    private int listed_price;

    private String avatar;

    private String sex;

    private String description;

    private Category category;

    private Brand brand;

    private Weight weight;

    private Origin origin;

    private LocalDateTime createDate;

    private LocalDateTime updateDate;

    private User createBy;

    private User updateBy;

    private String status;

    List<ImageDto> images;

    private List<ProductDetail> productDetails;

    /**
     * Nhật
     */

    private Integer color;

    private Integer height;

    private Integer size;


    private Integer formPrice;

    private Integer toPrice;

    private Integer categoryId;

    private  int pageIndex;

    private int pageSize;

}
