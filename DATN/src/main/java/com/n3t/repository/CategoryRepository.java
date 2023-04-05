package com.n3t.repository;

import com.n3t.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {

    @Query(value = "select * from categories where name like :name%", nativeQuery = true)
    List<Category> findByName(String name);
}