package com.n3t.controller;

import com.n3t.DTO.UserDto;
import com.n3t.entity.Address;
import com.n3t.service.AddressService;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.hibernate.service.spi.InjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/n3t/address")
@CrossOrigin("*")
public class AddressController {
    @Autowired
    private AddressService addressService;

    @GetMapping
    public ResponseEntity getAll() {
        return ResponseEntity.ok(this.addressService.getAll());
    }

    @GetMapping("/get-by-userid/{id}")
    public ResponseEntity getAllAddressByUser(@PathVariable("id") int id) {
        return ResponseEntity.ok(this.addressService.getAllByUser(id));
    }

    @PostMapping()
    public ResponseEntity<?> save(@RequestBody Address address) {
        List<Address> list = addressService.getAllByUser(address.getUser().getId());
        for(int i = 0; i < list.size(); i++) {
            list.get(i).setDefaultAdd(false);
        }
        return ResponseEntity.ok(this.addressService.save(address));
    }

    @PutMapping()
    public ResponseEntity<?> update(@RequestBody Address address) {
        return ResponseEntity.ok(this.addressService.update(address));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Integer id) {
        this.addressService.delete(id);
    }
}
