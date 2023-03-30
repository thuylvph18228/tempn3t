// Generated with g9.

package com.laclac.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.laclac.DTO.OrderDetailDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.LazyToOne;
import org.hibernate.annotations.LazyToOneOption;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity()
@Table(name="order_details")
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class  OrderDetail implements Serializable {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(unique=true, nullable=false, precision=10)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    @JsonIgnore
    private Order order;

    @ManyToOne()
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    @JsonBackReference(value="product")
    private Product product;

    @ManyToOne()
    @JoinColumn(name="product_detail_id", referencedColumnName = "id")
    @JsonBackReference
    private ProductDetail productDetail;

    @Column(nullable=false, precision=10)
    private int quantity;

    @Column(nullable=false, precision=10)
    private int price;

    private Integer status;

    @OneToMany(mappedBy = "orderDetail")
    @JsonIgnore
    private List<OrderHistory> orderHistory;

    public static OrderDetail toEntity(OrderDetailDto dto){
        OrderDetail orderDetail = OrderDetail.builder()
                .order(Order.builder().id(dto.getOrderId()).build())
                .product(Product.builder().id(dto.getProduct().getId()).build())
                .productDetail(ProductDetail.builder().id(dto.getProductDetail().getId()).build())
                .quantity(dto.getQuantity())
                .price(dto.getPrice())
                .status(dto.getStatus())
                .build();
        if(dto.getId() != null){
            orderDetail.setId(dto.getId());
        }
        return orderDetail;
    }

    public OrderDetailDto toDto(){
        return OrderDetailDto.builder()
                .id(this.id)
                .orderId(this.order != null ? this.order.getId() : null)
                .product(this.product == null ? null : this.product.toDto())
                .productDetail(this.productDetail == null ? null : this.productDetail.toDto())
                .quantity(this.quantity)
                .price(this.price)
                .status(this.status)
                .build();
    }

}
