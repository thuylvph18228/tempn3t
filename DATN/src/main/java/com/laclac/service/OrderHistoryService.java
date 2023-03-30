package com.laclac.service;

import com.laclac.DTO.OrderDto;
import com.laclac.DTO.OrderHistoryDto;
import com.laclac.entity.Order;
import com.laclac.entity.OrderHistory;

import java.util.List;

public interface OrderHistoryService {

    List<OrderHistoryDto> saveAll(List<OrderHistoryDto> orderHistoriesDto);
    List<OrderHistoryDto> getByOrderId(Integer orderId);
    List<OrderDto> getAllByUsername(String username);
    void delete(Integer id);
}
