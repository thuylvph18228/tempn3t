package com.laclac.repository;

import com.laclac.entity.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VoucherRepository extends JpaRepository<Voucher, Integer> {

    @Query(value = "select o from Voucher o where o.isDelete = 0")
    List<Voucher> findAll();
    Voucher findByCode(String code);

    @Query("select count(id) from  Voucher ")
    long countById();

}