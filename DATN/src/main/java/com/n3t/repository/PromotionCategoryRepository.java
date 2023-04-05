package com.n3t.repository;

import com.n3t.entity.PromotionCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PromotionCategoryRepository extends JpaRepository<PromotionCategory, Integer> {
}