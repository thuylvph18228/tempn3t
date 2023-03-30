package com.laclac.service.Iplm;

import com.laclac.controller.OrderDetailController;
import com.laclac.entity.OrderDetail;
import com.laclac.repository.OrderDetailRepository;
import com.laclac.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OrderDetailServiceImpl implements OrderDetailService {

    @Autowired
    private OrderDetailRepository orderDetailRepo;

    @Override
    @Transactional
    public List<OrderDetail> getAll() {
        return null;
    }

    @Override
    @Transactional
    public OrderDetail getById(int OrderDetailId) {
        return null;
    }

    @Override
    @Transactional
    public OrderDetail getByOrderId(int OrderId) {
        return null;
    }

    @Override
    @Transactional
    public OrderDetail save(OrderDetail orderDetail) {
        return null;
    }

    @Override
    @Transactional
    public OrderDetail update(OrderDetail orderDetail) {
        return null;
    }

    @Override
    @Transactional
    public OrderDetail delete(Integer id) {
        this.orderDetailRepo.deleteById(id);
        return null;
    }
}
