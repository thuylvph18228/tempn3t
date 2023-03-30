// Generated with g9.

package com.laclac.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.laclac.DTO.UserDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity()
@Table(name="users")
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class User implements Serializable {


    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(unique=true, nullable=false, precision=10)
    private Integer id;

    @Column(nullable=false, length=255)
    private String username;

    @Column(length=255)
    private String fullname;

    @Column(length=255)
    private String email;

    @Column(nullable=false, length=255)
    private String password;

    @Column(length=255)
    private String phone;

   @Column(length=255)
   private String province;

   @Column(length=255)
   private String district;

   @Column(length=255)
   private String ward;

   private String provinceId;

   private String districtId;

   private String wardCode;

    @Column(length=255)
    private String address;

    @Enumerated(EnumType.STRING)
    private UserStatus status;

    @Column(length=255)
    private String avatar;

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    private Set<UserRole> userRoles = new HashSet<>();

    @OneToMany(mappedBy = "createBy")
    @JsonIgnore
    private List<Order> orders;

    @OneToMany(mappedBy = "updateBy")
    @JsonIgnore
    private List<Order> orderList;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Feedback> feedbacks;

    @OneToMany(mappedBy = "createBy")
    @JsonIgnore
    private List<Category> categories;

    @OneToMany(mappedBy = "updateBy")
    @JsonIgnore
    private List<Category> categoryList;

    @OneToMany(mappedBy = "createBy")
    @JsonIgnore
    private List<Voucher> vouchers;

    @OneToMany(mappedBy = "updateBy")
    @JsonIgnore
    private List<Voucher> voucherList;

    @OneToMany(mappedBy = "createBy")
    @JsonIgnore
    private List<Promotion> promotions;

    @OneToMany(mappedBy = "updateBy")
    @JsonIgnore
    private List<Promotion> promotionList;

    @OneToMany(mappedBy = "createBy")
    @JsonIgnore
    private List<Product> products;

    @OneToMany(mappedBy = "updateBy")
    @JsonIgnore
    private List<Product> productList;

    @OneToMany(mappedBy = "createBy")
    @JsonIgnore
    private List<OrderHistory> orderHistories;

    @OneToMany(mappedBy = "updateBy")
    @JsonIgnore
    private List<OrderHistory> orderHistoriesUpdate;

    public static User toEntity(UserDto dto) {
        return User.builder()
                .id(dto.getId())
                .username(dto.getUsername())
                .password(dto.getPassword())
                .fullname(dto.getFullname())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .address(dto.getAddress())
                .province(dto.getProvince())
                .district(dto.getDistrict())
                .ward(dto.getWard())
                .wardCode(dto.getWardCode())
                .districtId(dto.getDistrictId())
                .provinceId(dto.getProvinceId())
                .status(UserStatus.valueOf(dto.getStatus()))
                .avatar(dto.getAvatar())
                .build();
    }

    public UserDto toDto() {
        UserDto userDto = UserDto.builder()
                .id(this.id)
                .username(this.username)
                .fullname(this.fullname)
                .email(this.email)
                .password(this.password)
                .phone(this.phone)
                .address(this.address)
                .province(this.province)
                .district(this.district)
                .ward(this.ward)
                .provinceId(this.provinceId)
                .districtId(this.districtId)
                .wardCode(this.wardCode)
                .status(String.valueOf(this.status))
                .avatar(this.avatar)
                .build();
        return userDto;
    }
}
