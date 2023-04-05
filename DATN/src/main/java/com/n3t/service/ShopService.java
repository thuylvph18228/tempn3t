package com.n3t.service;

import com.n3t.DTO.ShopDto;

public interface ShopService {
    ShopDto get();
    ShopDto save(ShopDto shopDto);
}
