package com.laclac.service;

import com.laclac.DTO.VoucherDto;
import com.laclac.entity.Voucher;

import java.util.List;

public interface VoucherService {
    List<VoucherDto> getAll();
    //lay ra voucher sap hoat dong
    List<Voucher> getByDate(String date);
    List<Voucher> getStatus(String status);
    Voucher getByCode(String code);
    VoucherDto save(VoucherDto voucherDto);
    Voucher delete(int id);
}
