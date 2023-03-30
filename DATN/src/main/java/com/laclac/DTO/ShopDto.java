package com.laclac.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;
import javax.persistence.Table;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class ShopDto {

    private Integer id;

    private String ownerName;

    private String address;

    private String province;

    private String district;

    private String ward;

    private String tel;

    private String email;

    private String passwordEmail;
}
