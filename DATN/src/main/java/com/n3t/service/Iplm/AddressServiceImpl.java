package com.n3t.service.Iplm;

import com.n3t.entity.Address;
import com.n3t.entity.User;
import com.n3t.repository.AddressRepository;
import com.n3t.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressServiceImpl implements AddressService {
    @Autowired
    private AddressRepository addressRepository;

    @Override
    public List<Address> getAll() {
        return this.addressRepository.findAll();
    }

    @Override
    public List<Address> getAllByUser(int id) {
        return this.addressRepository.findAllAddressByUser(id);
    }

    @Override
    public Address save(Address address) {
        return this.addressRepository.save(address);
    }

    @Override
    public Address update(Address address) {
        Address add = this.addressRepository.findById(address.getId()).get();
        return this.addressRepository.saveAndFlush(add);
    }

    @Override
    public Address delete(int id) {
        this.addressRepository.deleteById(id);
        return null;
    }
}
