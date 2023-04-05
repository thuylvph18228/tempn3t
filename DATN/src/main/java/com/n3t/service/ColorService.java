package com.n3t.service;

import com.n3t.entity.Color;

import java.util.List;

public interface ColorService {
    List<Color> getAll();
    Color getById(int ColorId);
    Color save(Color color);
    Color update(Color color);
    void delete(int id);
}
