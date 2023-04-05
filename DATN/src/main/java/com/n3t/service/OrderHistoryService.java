package com.n3t.service;

import com.n3t.DTO.OrderDto;
import com.n3t.DTO.OrderHistoryDto;

import java.util.List;

public interface OrderHistoryService {

    List<OrderHistoryDto> saveAll(List<OrderHistoryDto> orderHistoriesDto);
    List<OrderHistoryDto> getByOrderId(Integer orderId);
    List<OrderDto> getAllByUsername(String username);
    void delete(Integer id);
}
