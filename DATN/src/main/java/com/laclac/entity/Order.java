// Generated with g9.

package com.laclac.entity;

import com.laclac.DTO.CurrentUser;
import com.laclac.DTO.OrderDetailDto;
import com.laclac.DTO.OrderDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Entity()
@Table(name="orders")
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class Order{

     
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(unique=true, nullable=false, precision=10)
    private Integer id;

    @Column(nullable=false, length=255)
    private String code;

    @Column(name = "code_ghn")
    private String codeGHN;

    @Column(name="created_date", nullable=false)
    private LocalDateTime createdDate;

    @Column(name="update_date")
    private LocalDateTime updateDate;

    @Column(name="customer_name", length=255)
    private String customerName;

    @Column(nullable=false, length=255)
    private String phone;

    @Column( length=255)
    private String address;

    @Column(length=255)
    private String province;

    @Column(length=255)
    private String district;

    @Column(length=255)
    private String ward;

    @Column(length=255)
    private String description;

    @Enumerated(EnumType.STRING)
    private OrderType orderType;

    @Enumerated(EnumType.STRING)
    private PaymentType paymentType;

    @ManyToOne()
    @JoinColumn(name = "voucher_id", referencedColumnName = "id")
    private Voucher voucher;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    @ManyToOne()
    @JoinColumn(name = "create_by", referencedColumnName = "id")
    private User createBy;

    @ManyToOne()
    @JoinColumn(name = "update_by", referencedColumnName = "id")
    private User updateBy;

    @OneToMany(mappedBy = "order")
    private List<OrderHistory> orderHistories;

    @OneToMany(mappedBy = "order")
    private Set<OrderDetail> orderDetails;

    @OneToOne(mappedBy = "order")
    private Notification notification;

    @Column(name = "is_pay")
    private Integer isPay;

    public static Order toEntity(OrderDto orderDto) {
        Order order = Order.builder()
                .customerName(orderDto.getCustomerName())
                .phone(orderDto.getPhone())
                .address(orderDto.getAddress())
                .province(orderDto.getProvince())
                .district(orderDto.getDistrict())
                .ward(orderDto.getWard())
                .voucher(orderDto.getVoucher() != null ? orderDto.getVoucher() : null)
                .status(OrderStatus.valueOf(orderDto.getStatus()))
                .paymentType(PaymentType.valueOf(orderDto.getPaymentType()))
                .orderType(OrderType.valueOf(orderDto.getOrderType()))
                .description(orderDto.getDescription())
                .isPay(orderDto.getIsPay())
                .build();
        if(orderDto.getId() != null){
            order.setId(orderDto.getId());
            order.setCode(orderDto.getCode());
            order.setCreatedDate(orderDto.getCreatedDate());
            order.setUpdateDate(LocalDateTime.now());
            order.setCreateBy(orderDto.getCreateBy());
            User user = CurrentUser.getCurrentUser().get();
            for (UserRole userRole : CurrentUser.getCurrentUser().get().getUserRoles()) {
                if(userRole.getRole().getName() == "ADMIN"){
                    order.setUpdateBy(CurrentUser.getCurrentUser().get());
                    break;
                }
            }
        } else {
            order.setCreatedDate(LocalDateTime.now());
            order.setCreateBy(CurrentUser.getCurrentUser().isPresent() ? CurrentUser.getCurrentUser().get() : null );
            int code = (int)((Math.random() + 1) * 10000000);
            order.setCode(code + "");
        }
        if(orderDto.getCodeGHN() != null){
            order.setCodeGHN(orderDto.getCodeGHN());
        }
        if(order.orderType.toString().equalsIgnoreCase("OFFLINE")){
            order.setIsPay(1);
        }
        return order;
    }

    public OrderDto toDto(){
        OrderDto orderDto = OrderDto.builder()
                .id(this.id)
                .code(this.code)
                .codeGHN(this.codeGHN != null ? this.codeGHN : null)
                .createdDate(this.createdDate)
                .updateDate(this.updateDate)
                .customerName(this.customerName)
                .phone(this.phone)
                .address(this.address)
                .province(this.province)
                .district(this.district)
                .ward(this.ward)
                .status(this.status.toString())
                .paymentType(this.paymentType.toString())
                .createBy(this.createBy)
                .updateBy(this.updateBy != null ? this.updateBy : null)
                .description(this.description)
                .orderType(this.orderType.toString())
                .isPay(this.isPay)
                .build();
        if(this.orderDetails == null || this.orderDetails.isEmpty()){
        } else {
            orderDto.setOrderDetails(this.orderDetails.stream().map(OrderDetail :: toDto).collect(Collectors.toList()));
        }
        if(this.voucher != null){
            orderDto.setVoucher(this.voucher);
        }
        if(this.orderHistories != null && !this.orderHistories.isEmpty()){
            orderDto.setOrderHistories(this.orderHistories.stream().map(OrderHistory :: toDto).collect(Collectors.toList()));
        }
        return orderDto;
    }
}
