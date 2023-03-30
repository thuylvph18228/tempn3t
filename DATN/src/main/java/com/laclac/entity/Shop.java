package com.laclac.entity;

import com.laclac.DTO.ShopDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Entity()
@Table(name="shop")
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class Shop {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(unique=true, nullable=false, precision=10)
    private Integer id;

    @Column(name = "owner_name")
    private String ownerName;

    private String address;

    private String province;

    private String district;

    private String ward;

    private String tel;

    private String email;

//    @Column(name = "password_email")
//    private String passwordEmail;

    public static Shop toEntity(ShopDto shopDto){
        return Shop.builder()
                .id(shopDto.getId())
                .ownerName(shopDto.getOwnerName())
                .address(shopDto.getAddress())
                .province(shopDto.getProvince())
                .district(shopDto.getDistrict())
                .ward(shopDto.getWard())
                .tel(shopDto.getTel())
                .email(shopDto.getEmail())
//                .passwordEmail(shopDto.getPasswordEmail())
                .build();
    }

    public ShopDto toDto(){
        return ShopDto.builder()
                .id(this.getId())
                .ownerName(this.getOwnerName())
                .address(this.getAddress())
                .province(this.getProvince())
                .district(this.getDistrict())
                .ward(this.getWard())
                .tel(this.getTel())
                .email(this.getEmail())
//                .passwordEmail(this.getPasswordEmail())
                .build();
    }
}
