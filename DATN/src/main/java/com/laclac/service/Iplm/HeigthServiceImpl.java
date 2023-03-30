package com.laclac.service.Iplm;

import com.laclac.entity.Height;
import com.laclac.repository.HeightRepository;
import com.laclac.service.HeightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class HeigthServiceImpl implements HeightService {

    @Autowired
    private HeightRepository heightRepo;

    @Override
    @Transactional
    public List<Height> getAll() {
        return this.heightRepo.findAll();
    }

    @Override
    @Transactional
    public Height getById(int HeightId) {
        return null;
    }

    @Override
    @Transactional
    public Height save(Height height) {
        return this.heightRepo.save(height);
    }

    @Override
    @Transactional
    public Height update(Height height) {
        return null;
    }

    @Override
    @Transactional
    public void delete(int id) {
        this.heightRepo.deleteById(id);
    }
}
