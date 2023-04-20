package com.n3t.repository;

import com.n3t.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Integer> {
    @Query(value = "select * from address where user_id = :id", nativeQuery = true)
    List<Address> findAllAddressByUser(int id);
}
