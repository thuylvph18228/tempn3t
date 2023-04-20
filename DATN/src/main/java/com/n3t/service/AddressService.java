package com.n3t.service;

import com.n3t.entity.Address;

import java.util.List;

public interface AddressService {
    List<Address> getAll();
    List<Address> getAllByUser(int id);
    Address save(Address address);
    Address update(Address address);
    Address delete(int id);
}
