package com.n3t.service.Iplm;

import com.n3t.DTO.ShopDto;
import com.n3t.entity.Shop;
import com.n3t.repository.ShopRepository;
import com.n3t.service.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ShopServiceImpl implements ShopService {

    @Autowired
    private ShopRepository shopRepo;

    @Override
    public ShopDto get() {
        return shopRepo.findAll().get(0).toDto();
    }

    @Override
    public ShopDto save(ShopDto shopDto) {
        return this.shopRepo.save(Shop.toEntity(shopDto)).toDto();
    }
}
