package com.n3t.service;

import com.n3t.entity.OrderDetail;

import java.util.List;
public interface OrderDetailService {
    List<OrderDetail> getAll();
    OrderDetail getById(int OrderDetailId);
    OrderDetail getByOrderId(int OrderId);
    OrderDetail save(OrderDetail orderDetail);
    OrderDetail update(OrderDetail orderDetail);
    OrderDetail delete(Integer id);
}
