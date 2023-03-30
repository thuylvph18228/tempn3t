package com.laclac.DTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.Column;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Integer id;

    private String username;

    private String fullname;

    private String email;

    private String password;

    private String phone;

    private String address;

    private String status;

    private String avatar;

    private String province;

    private String district;

    private String ward;

    private String wardCode;

    private String districtId;

    private String provinceId;
}
