package com.laclac.service.Iplm;

import com.laclac.DTO.OrderDto;
import com.laclac.DTO.OrderHistoryDto;
import com.laclac.entity.Order;
import com.laclac.entity.OrderHistory;
import com.laclac.repository.OrderHistoryRepository;
import com.laclac.service.OrderHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderHistoryServiceImpl implements OrderHistoryService {

    @Autowired
    private OrderHistoryRepository orderHistoryRepo;

    @Override
    public List<OrderHistoryDto> saveAll(List<OrderHistoryDto> orderHistoriesDto) {
        List<OrderHistory> orderHistories = orderHistoriesDto.stream().map(OrderHistory :: toEntity).collect(Collectors.toList());
        return this.orderHistoryRepo.saveAll(orderHistories).stream().map(OrderHistory :: toDto).collect(Collectors.toList());
    }

    @Override
    public List<OrderHistoryDto> getByOrderId(Integer orderId) {
        return this.orderHistoryRepo.getAllByOrderId(orderId).stream().map(OrderHistory :: toDto).collect(Collectors.toList());
    }

    @Override
    public List<OrderDto> getAllByUsername(String username) {
        return this.orderHistoryRepo.getAllOrderReturnByUsername(username).stream().map(Order:: toDto).collect(Collectors.toList());
    }

    @Override
    public void delete(Integer id) {
        this.orderHistoryRepo.deleteById(id);
    }
}
