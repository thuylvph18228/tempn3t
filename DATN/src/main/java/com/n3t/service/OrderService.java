package com.n3t.service;

import com.n3t.DTO.OrderDto;
import com.n3t.entity.Order;
import org.springframework.data.domain.Page;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.util.List;

public interface OrderService {
    Page<Order> getAll(Integer page, Integer size);
    List<Order> getAllByCreatedDate(String date);
    List<OrderDto> getAllByUserName(String username);
    List<OrderDto> getAllOrderReturn(String status);
    Page<Order> getAllByStatus(Integer page, Integer size, String status);
    Order getById(int OrderId);
    List<OrderDto> finAllBy(String orderCode);
    List<OrderDto> finAllByCodeAndStatus(String orderCode, String status);

    OrderDto save(OrderDto orderDto) throws MessagingException;
    OrderDto updateStatus(OrderDto orderDto);

    OrderDto returnOrder(OrderDto orderDto);
    //huy đơn yêu cầu đổi hàng
    void cancelReturnOrder(OrderDto orderDto);
    void delete(OrderDto orderDto);

    //thống kê số lượng đơn hàng theo các tháng theo năm
    List<Object> countOrder(String year);

    //count hóa đơn trong ngày, trong tháng, trong năm
    List<Object> countInDay(String month, String year);

    //thống kê doanh thu các tháng
    List<Object> turnover(String year);

    //tìm kiếm đơn hàng theo khoảng thời gian
    List<OrderDto> findByTime(String begin, String end);

    List<OrderDto> findByTimeAndStatus(String begin, String end, String status);

    // lọc các hóa đơn theo tổng tiền
    List<OrderDto> getBytotalMoney(String beginMoney, String endMoney);

    // lọc các hóa đơn theo tổng tiền và trạng thái
    List<OrderDto> getOrderByTotalMoneyAndStatus(String beginMoney, String endMoney, String status);

    // thanh toán online
    String pay(OrderDto orderDto) throws UnsupportedEncodingException;

    OrderDto updatePay() throws MessagingException;

}
