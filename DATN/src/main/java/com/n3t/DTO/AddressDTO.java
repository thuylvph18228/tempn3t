package com.n3t.DTO;

import com.n3t.entity.User;
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
public class AddressDTO {
    private Integer id;

    private String name;

    private String phone;

    private String address;

    private String province;

    private String district;

    private String ward;

    private String wardCode;

    private String districtId;

    private String provinceId;

    private Integer defaultAdd;

    private User user;
}
