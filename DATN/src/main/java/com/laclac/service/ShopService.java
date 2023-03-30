package com.laclac.service;

import com.laclac.DTO.ShopDto;

import java.util.List;

public interface ShopService {
    ShopDto get();
    ShopDto save(ShopDto shopDto);
}
