package com.laclac.controller;

import com.laclac.DTO.VoucherDto;
import com.laclac.service.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/laclac/voucher")
public class VoucherController {

    @Autowired
    private VoucherService voucherService;

    @GetMapping
    private ResponseEntity getAll() {
        return ResponseEntity.ok(this.voucherService.getAll());
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
