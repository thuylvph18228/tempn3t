package com.laclac.controller;

import com.laclac.service.OrderService;
import com.laclac.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/laclac/statistic")
@CrossOrigin("*")
public class StatisticController {

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

}
