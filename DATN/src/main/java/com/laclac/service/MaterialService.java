package com.laclac.service;

import com.laclac.entity.Material;

import java.util.List;

public interface MaterialService {
    List<Material> getAll();
    Material getById(int MaterialId);
    Material save(Material material);
    Material update(Material material);
    void delete(int id);
}
