package com.n3t.controller;

import com.n3t.DTO.VoucherDto;
import com.n3t.service.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/n3t/voucher")
public class VoucherController {

    @Autowired
    private VoucherService voucherService;

    @GetMapping
    private ResponseEntity getAll() {
        return ResponseEntity.ok(this.voucherService.getAll());
    }

    @GetMapping("/byStatus")
    private ResponseEntity getAllByStatus() {
        return ResponseEntity.ok(this.voucherService.getByStatus());
    }

    @GetMapping("/money/{money}")
    private ResponseEntity<?> getByMoney(@PathVariable("money") int money) {
        return ResponseEntity.ok(this.voucherService.getByMoney(money));
    }

    @GetMapping("/{code}")
    private ResponseEntity findByCode(@PathVariable("code") String code) {
        return ResponseEntity.ok(this.voucherService.getByCode(code));
    }

    @PostMapping
    private ResponseEntity save(@RequestBody VoucherDto voucherDto){
        return ResponseEntity.ok(this.voucherService.save(voucherDto));
    }

    @PutMapping()
    private void delete (@RequestBody VoucherDto voucherDto) {
        voucherDto.setIsDelete(1);
        voucherDto.setStatus("UNAVAILABLE");
        this.save(voucherDto);
    }


}
