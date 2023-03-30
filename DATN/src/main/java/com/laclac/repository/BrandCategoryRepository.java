package com.laclac.repository;

import com.laclac.entity.BrandCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BrandCategoryRepository extends JpaRepository<BrandCategory, Integer> {
    List<BrandCategory> findByBrandId(Integer id);
}
