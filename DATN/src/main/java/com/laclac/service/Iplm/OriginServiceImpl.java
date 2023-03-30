package com.laclac.service.Iplm;

import com.laclac.entity.Origin;
import com.laclac.repository.OriginRepository;
import com.laclac.service.OriginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OriginServiceImpl implements OriginService {

    @Autowired
    private OriginRepository originRepo;

    @Override
    @Transactional
    public List<Origin> getAll() {
        return this.originRepo.findAll();
    }

    @Override
    @Transactional
    public Origin getById(int OriginId) {
        return null;
    }

    @Override
    @Transactional
    public Origin save(Origin origin) {
        return this.originRepo.save(origin);
    }

    @Override
    @Transactional
    public Origin update(Origin origin) {
        return null;
    }

    @Override
    @Transactional
    public void delete(int id) {
        this.originRepo.deleteById(id);
    }
}
