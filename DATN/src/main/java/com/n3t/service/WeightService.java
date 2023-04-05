package com.n3t.service;

import com.n3t.entity.Weight;

import java.util.List;

public interface WeightService {
    List<Weight> getAll();
    Weight getById(int WeightId);
    Weight save(Weight weight);
    Weight update(Weight weight);
    void delete(int id);
}
