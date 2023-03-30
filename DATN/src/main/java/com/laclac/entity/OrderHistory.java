package com.laclac.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.laclac.DTO.CurrentUser;
import com.laclac.DTO.OrderHistoryDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "order_history")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class OrderHistory {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(unique=true, nullable=false, precision=10)
    private Integer id;

    @Enumerated(EnumType.STRING)
    private ActionOrderHistory action;

    private Integer quantity;

    private String description;

    @Enumerated(EnumType.STRING)
    private Status status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "create_by", referencedColumnName = "id")
    private User createBy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "update_by", referencedColumnName = "id")
    private User updateBy;

    private LocalDateTime createdDate;

    @ManyToOne()
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    @JsonIgnore
    private Order order;

    @ManyToOne()
    @JoinColumn(name = "product_detail_id", referencedColumnName = "id")
    private ProductDetail productDetail;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_detail_id", referencedColumnName = "id")
    private OrderDetail orderDetail;

    public static OrderHistory toEntity(OrderHistoryDto orderHistoryDto){
        OrderHistory orderHistory = OrderHistory.builder()
                .id(orderHistoryDto.getId() != null ? orderHistoryDto.getId() : null)
                .action(ActionOrderHistory.valueOf(orderHistoryDto.getAction()))
                .quantity(orderHistoryDto.getQuantity())
                .description(orderHistoryDto.getDescription())
                .status(Status.valueOf(orderHistoryDto.getStatus()))
                .updateBy(orderHistoryDto.getId() != null ? CurrentUser.getCurrentUser().get() : null)
                .createdDate(orderHistoryDto.getCreatedDate() != null ? orderHistoryDto.getCreatedDate() : LocalDateTime.now())
                .order(Order.builder().id(orderHistoryDto.getOrderId()).build())
                .productDetail(ProductDetail.builder().id(orderHistoryDto.getProductDetail().getId()).build())
                .orderDetail(OrderDetail.builder().id(orderHistoryDto.getOrderDetail().getId()).build())
                .build();
        if(orderHistoryDto.getId() == null){
            orderHistory.setCreateBy(CurrentUser.getCurrentUser().get());
        } else {
            orderHistory.setCreateBy(orderHistory.getCreateBy());
        }
        return orderHistory;
    }

    public OrderHistoryDto toDto(){
        return OrderHistoryDto.builder()
                .id(this.id)
                .action(this.action.toString())
                .quantity(this.quantity)
                .description(this.description)
                .status(this.status.toString())
                .createBy(this.createBy)
                .updateBy(this.updateBy)
                .createdDate(this.createdDate)
                .orderId(this.order.getId())
                .productDetail(this.productDetail.toDto())
                .orderDetail(this.orderDetail.toDto())
                .build();
    }

}
