package com.n3t.service;

import com.n3t.DTO.VoucherDto;
import com.n3t.entity.Voucher;

import java.util.List;

public interface VoucherService {
    List<VoucherDto> getAll();
    //lay ra voucher sap hoat dong
    List<Voucher> getByDate(String date);
    List<Voucher> getStatus(String status);
    Voucher getByCode(String code);
    VoucherDto save(VoucherDto voucherDto);
    Voucher delete(int id);
    List<Voucher> getByMoney(int money);
    List<Voucher> getByStatus();

}
