package com.laclac.service;


import com.laclac.entity.Origin;

import java.util.List;

public interface OriginService {
    List<Origin> getAll();
    Origin getById(int OriginId);
    Origin save(Origin origin);
    Origin update(Origin origin);
    void delete(int id);
}
