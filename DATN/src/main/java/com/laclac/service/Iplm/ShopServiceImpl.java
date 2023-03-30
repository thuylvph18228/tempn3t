package com.laclac.service.Iplm;

import com.laclac.DTO.ShopDto;
import com.laclac.entity.Shop;
import com.laclac.repository.ShopRepository;
import com.laclac.service.ShopService;
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
