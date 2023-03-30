// Generated with g9.

package com.laclac.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.laclac.DTO.CurrentUser;
import com.laclac.DTO.VoucherDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import net.bytebuddy.utility.RandomString;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;
import java.util.Random;

@Entity()
@Table(name="vouchers")
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class Voucher implements Serializable {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(unique=true, nullable=false, precision=10)
    private Integer id;

    private String name;

    @Column(name = "code_voucher")
    private String code;

    @Column(name="min_money", nullable=false, precision=10)
    private Integer minMoney;

    @Column(name="begin_date", nullable=false)
    private LocalDate beginDate;

    @Column(name="end_date", nullable=false)
    private LocalDate endDate;

    @Column(nullable=false, precision=10)
    private Integer promotion;

    @Column(nullable=false, precision=10)
    private Integer quantity;

    @Enumerated(EnumType.STRING)
    private Status status;

    private Integer isDelete;

    @OneToMany(mappedBy = "voucher")
    @JsonIgnore
    private List<Order> orders;

    @ManyToOne()
    @JoinColumn(name = "create_by", referencedColumnName = "id")
    private User createBy;

    @ManyToOne()
    @JoinColumn(name = "update_by", referencedColumnName = "id")
    private User updateBy;

    public static Voucher toEntity(VoucherDto voucherDto){
        Voucher voucher = Voucher.builder()
                .name(voucherDto.getName())
                .minMoney(voucherDto.getMinMoney())
                .beginDate(voucherDto.getBeginDate())
                .endDate(voucherDto.getEndDate())
                .quantity(voucherDto.getQuantity())
                .promotion(voucherDto.getPromotion())
                .status(Status.valueOf(voucherDto.getStatus()))
                .isDelete(voucherDto.getIsDelete() != null ? voucherDto.getIsDelete() : null)
                .build();
        if(voucherDto.getId() == null){
            voucher.setCode(getSaltString());
            voucher.setCreateBy(CurrentUser.getCurrentUser().get());
        } else {
            voucher.setId(voucherDto.getId());
            voucher.setCode(voucherDto.getCode());
            voucher.setCreateBy(voucherDto.getCreateBy());
            voucher.setUpdateBy(CurrentUser.getCurrentUser().isPresent() ? CurrentUser.getCurrentUser().get() : null);
        }
        return voucher;
    }

    public VoucherDto toDto(){
        VoucherDto voucherDto = VoucherDto.builder()
                .id(this.id)
                .name(this.name)
                .code(this.code)
                .minMoney(this.minMoney)
                .beginDate(this.beginDate)
                .endDate(this.endDate)
                .quantity(this.quantity)
                .promotion(this.promotion)
                .status(this.status.toString())
                .isDelete(this.isDelete)
                .createBy(this.createBy)
                .updateBy(this.updateBy)
                .build();
        return voucherDto;
    }

    /**
     * random code 9 ký tự
     * generate string
     * @return string
     */
    protected static String getSaltString() {
        String SALTCHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        StringBuilder salt = new StringBuilder();
        Random rnd = new Random();
        while (salt.length() < 9) { // length of the random string.
            int index = (int) (rnd.nextFloat() * SALTCHARS.length());
            salt.append(SALTCHARS.charAt(index));
        }
        String saltStr = salt.toString();
        return saltStr;

    }

}
