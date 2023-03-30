package com.laclac.controller;

import com.laclac.DTO.OrderDto;
import com.laclac.DTO.VNPayDTO;
import com.laclac.entity.Order;
import com.laclac.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/laclac/order")
@CrossOrigin("*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    /**
     * lay ra tat ca don hang
     * @param page
     * @param size
     * @return
     */
    @GetMapping
    private ResponseEntity getAll(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "15") int size
    ) {
        Page<Order> orders = this.orderService.getAll(page, size);
        List<OrderDto> list = orders.stream().map(Order::toDto).collect(Collectors.toList());
        Integer allPage = orders.getTotalPages();
        Long totalOrder = orders.getTotalElements();
        List<Object> object = new ArrayList<>();
        object.add(list);
        object.add(allPage);
        object.add(totalOrder);
        return ResponseEntity.ok(object);
    }

    /**
     * lay ra tat ca don hang theo status
     * @param status
     * @param page
     * @param size
     * @return
     */
    @GetMapping("/status")
    public ResponseEntity getAllByStatus(
            @RequestParam(name = "status", defaultValue = "") String status,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "15") int size
    ){
        Page<Order> orders = null;
        Integer allPage = null;
        Long totalOrder = null;
        List<OrderDto> orderDtoList = null;
        if(status.isEmpty()) {
            orders = this.orderService.getAll(page, size);
            orderDtoList = orders.stream().map(Order :: toDto).collect(Collectors.toList());
            allPage = orders.getTotalPages();
            totalOrder = orders.getTotalElements();
        } else{
            orders =  this.orderService.getAllByStatus(page, size, status);
            orderDtoList = orders.stream().map(Order :: toDto).collect(Collectors.toList());
            allPage = orders.getTotalPages();
            totalOrder = orders.getTotalElements();
        }
        List<Object> object = new ArrayList<>();
        object.add(orderDtoList);
        object.add(allPage);
        object.add(totalOrder);
        return ResponseEntity.ok(object);
    }

    /**
     * tao moi don hang
     * @param orderDto
     * @return
     */
    @PostMapping
    private ResponseEntity save(@RequestBody OrderDto orderDto) throws MessagingException {
        return ResponseEntity.ok(this.orderService.save(orderDto));
    }

    /**
     * cap nhat trang thai don hang
     * @param orderDto
     * @return
     */
    @PutMapping("/update-status")
    private ResponseEntity updateStatus(@RequestBody OrderDto orderDto){
        return ResponseEntity.ok(this.orderService.updateStatus(orderDto));
    }

    /**
     * tim kiem don hang theo user name
     * @param username
     * @return
     */
    @GetMapping("/user/{username}")
    public ResponseEntity getAllByUser(
            @PathVariable("username") String username
    ){
        return ResponseEntity.ok(this.orderService.getAllByUserName(username));
    }

    /**
     * tim kiem don hang theo ma don hang, tenkh, sdt
     * @param orderCode
     * @return
     */
    @GetMapping("/search")
    public ResponseEntity getByOrderCode(
            @RequestParam("orderCode") String orderCode
    ) {
        return ResponseEntity.ok(this.orderService.finAllBy(orderCode));
    }

    @GetMapping("/findByTime")
    public ResponseEntity findOrderByTime(
            @RequestParam(name = "beginDate") String beginDate,
            @RequestParam(name = "endDate") String endDate
    ){
        return ResponseEntity.ok(this.orderService.findByTime(beginDate, endDate));
    }

    /**
     * get all order return by action
     * @param status
     * @return
     */
    @GetMapping("/return_order")
    private ResponseEntity getAllOrderReturn(@RequestParam("status") String status) {
        return ResponseEntity.ok(this.orderService.getAllOrderReturn(status));
    }

    /**
     * doi, tra hang
     * @param orderDto
     * @return
     */
    @PostMapping("/returnOrder")
    public ResponseEntity returnOrder (@RequestBody OrderDto orderDto) {
        return ResponseEntity.ok(this.orderService.returnOrder(orderDto));
    }

    @PostMapping("/cancelReturnOrder")
    public ResponseEntity cancelReturnOrder(@RequestBody OrderDto orderDto){
        this.orderService.cancelReturnOrder(orderDto);
        return ResponseEntity.ok(null);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable("id") Order order) {
        this.orderService.delete(order.toDto());
        return ResponseEntity.ok(null);
    }

    @GetMapping("/totalMoney")
    public ResponseEntity getByTotalMoney(
            @RequestParam(name = "beginMoney") String beginMoney,
            @RequestParam(name = "endMoney") String endMoney
    ){
        return ResponseEntity.ok(this.orderService.getBytotalMoney(beginMoney, endMoney));
    }

    //thanh toán online
    @PostMapping("/pay")
    public ResponseEntity payOrder(
            @RequestBody OrderDto orderDto
    ) throws UnsupportedEncodingException {
        List<Object> object = new ArrayList<>();
        object.add(this.orderService.pay(orderDto));
        return ResponseEntity.ok(object);
    }

    @GetMapping("/updatePay")
    public ResponseEntity updatePay() throws MessagingException {
        return ResponseEntity.ok(this.orderService.updatePay());
    }

}
