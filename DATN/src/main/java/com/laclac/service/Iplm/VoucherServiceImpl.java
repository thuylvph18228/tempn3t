package com.laclac.service.Iplm;

import com.laclac.DTO.VoucherDto;
import com.laclac.entity.Voucher;
import com.laclac.repository.VoucherRepository;
import com.laclac.service.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class VoucherServiceImpl implements VoucherService {

    @Autowired
    private VoucherRepository voucherRepo;

    @Override
    @Transactional
    public List<VoucherDto> getAll() {
        return this.voucherRepo.findAll().stream().map(Voucher :: toDto).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<Voucher> getByDate(String date) {
        return null;
    }

    @Override
    @Transactional
    public List<Voucher> getStatus(String status) {
        return null;
    }

    @Override
    @Transactional
    public Voucher getByCode(String code) {
        Voucher voucher = this.voucherRepo.findByCode(code);
        VoucherDto voucherDto = this.save(voucher.toDto());
        if(voucherDto.getStatus().equals("UNAVAILABLE")){
            return null;
        }
        return voucher;
    }

    @Override
    @Transactional
    public VoucherDto save(VoucherDto voucherDto) {
        if(voucherDto.getBeginDate().isAfter(LocalDate.now()) || voucherDto.getEndDate().isBefore(LocalDate.now()) || voucherDto.getQuantity() == 0){
            voucherDto.setStatus("UNAVAILABLE");
        }
        return this.voucherRepo.save(Voucher.toEntity(voucherDto)).toDto();
    }

    @Override
    @Transactional
    public Voucher delete(int id) {
        return null;
    }
}
