package com.n3t.controller;

import com.n3t.repository.OrderRepository;
import com.n3t.service.OrderService;
import com.n3t.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/n3t/statistic")
@CrossOrigin("*")
public class StatisticController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderService orderService;

    @Autowired
    private ProductService productService;

    //tính số lượng đơn các tháng
    @GetMapping("/countOrder")
    private ResponseEntity countOrder(@RequestParam("year") String year){
        return ResponseEntity.ok(this.orderService.countOrder(year));
    }

    //tính doanh thu các tháng
    @GetMapping("/turnover")
    private ResponseEntity turnover(@RequestParam("year") String year){
        return ResponseEntity.ok(this.orderService.turnover(year));
    }

    //count số lượng hóa đơn theo ngày trong tháng
    @GetMapping("/count-in-month")
    private ResponseEntity countInMonth(
            @RequestParam("month") String month,
            @RequestParam("year") String year
    ){
        return ResponseEntity.ok(this.orderService.countInDay(month,year));
    }

    // thống kê top15 sản phẩm bán nhiều nhất
    @GetMapping("/get-product")
    public ResponseEntity getProduct(){
        return ResponseEntity.ok(this.productService.getProduct());
    }

    @GetMapping("/countOrderByTime")
    public ResponseEntity<List<Map<String, Object>>> countOrderByTime(@RequestParam("begin") String begin, @RequestParam("end") String end) {
        List<Map<String, Object>> result = orderRepository.countOrderByTime(begin, end);
        List<Map<String, Object>> response = new ArrayList<>();
        for (Map<String, Object> map : result) {
            Map<String, Object> data = new HashMap<>();
            data.put("dd", map.get("dd"));
            data.put("total", map.get("total"));
            System.out.println(data);
            response.add(data);
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/count-by-day")
    public ResponseEntity<List<Map<String, Object>>> countOrderByDay(@RequestParam("month") int month, @RequestParam("year") int year) {
        List<Map<String, Object>> result = orderRepository.countOrderByMonthAndYear(year, month);
        System.out.println(result);
        List<Map<String, Object>> response = new ArrayList<>();
        for (Map<String, Object> map : result) {
            Map<String, Object> data = new HashMap<>();
            data.put("dd", map.get("dd"));
            data.put("total", map.get("total"));
            response.add(data);
        }
        return ResponseEntity.ok(response);
    }

}
