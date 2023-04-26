package com.n3t.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.io.Serializable;

@Entity()
@Table(name="address")
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class Address implements Serializable {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(unique=true, nullable=false, precision=10)
    private Integer id;

    @Column(length=255)
    private String name;

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

    @Column(name = "default_address")
    private boolean defaultAdd;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
}
