package com.n3t.repository;

import com.n3t.entity.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VoucherRepository extends JpaRepository<Voucher, Integer> {

    @Query(value = "select o from Voucher o where o.isDelete = 0")
    List<Voucher> findAll();
    @Query(value = "select o from Voucher o where :money >= o.minMoney and o.quantity > 0 and o.status = 'AVAILABLE'")
    List<Voucher>  findByMinMoney(int money);
    @Query(value = "select o from Voucher o where o.quantity > 0 and o.status = 'AVAILABLE'")
    List<Voucher>  findByStatus();
    Voucher findByCode(String code);

    @Query("select count(id) from  Voucher ")
    long countById();

}