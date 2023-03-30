package com.laclac.service;

import com.laclac.entity.Size;

import java.util.List;

public interface SizeService {
    List<Size> getAll();
    Size getById(int SizeId);
    Size save(Size size);
    Size update(Size size);
    void delete(int id);
}
