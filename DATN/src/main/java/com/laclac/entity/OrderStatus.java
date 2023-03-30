// Generated with g9.

package com.laclac.entity;

public enum OrderStatus {

    //đang chờ xác nhận
    WAIT_FOR_CONFIRMATION,
    // đã xác nhận
    CONFIRMED,
    //không được xác nhận
    UNCONFIRM,
    //chờ bên vận chuyển lấy hàng
    WAIT_FOR_THE_SHIPPER_TO_PICK_UP,
    //đang giao hàng
    DELIVERING,
    //không giao được hàng
    NO_DELIVERY,
    //đã giao hàng thành công
    DELIVERED,
    //đã hủy
    CANCELLED

}
