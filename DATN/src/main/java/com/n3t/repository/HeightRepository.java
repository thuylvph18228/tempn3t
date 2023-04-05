package com.n3t.repository;

import com.n3t.entity.Height;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HeightRepository extends JpaRepository<Height, Integer> {
}
