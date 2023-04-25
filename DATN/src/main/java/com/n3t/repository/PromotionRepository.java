package com.n3t.repository;

import com.n3t.entity.Promotion;
import com.n3t.entity.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PromotionRepository extends JpaRepository<Promotion, Integer> {
    @Query(value = "select o from Promotion o where o.isDelete = 0")
    List<Promotion> findAll();

    @Query(value = "SELECT * FROM promotions\n" +
            "WHERE begin_date <= CURRENT_DATE() AND end_date >= CURRENT_DATE()\n" +
            "AND status = 'AVAILABLE' AND is_delete = 0\n", nativeQuery = true)
    List<Promotion> findAllPromotionByStatusPromotion();
}