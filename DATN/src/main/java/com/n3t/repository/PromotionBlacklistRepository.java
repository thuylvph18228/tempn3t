package com.n3t.repository;

import com.n3t.entity.PromotionBlacklist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PromotionBlacklistRepository extends JpaRepository<PromotionBlacklist, Integer> {
}