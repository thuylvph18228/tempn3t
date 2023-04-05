package com.n3t.service;

import com.n3t.entity.Size;

import java.util.List;

public interface SizeService {
    List<Size> getAll();
    Size getById(int SizeId);
    Size save(Size size);
    Size update(Size size);
    void delete(int id);
}
