package com.n3t.service.Iplm;

import com.n3t.entity.Size;
import com.n3t.repository.SizeRepository;
import com.n3t.service.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SizeServiceImpl implements SizeService {

    @Autowired
    private SizeRepository sizeRepo;

    @Override
    @Transactional
    public List<Size> getAll() {
        return this.sizeRepo.findAll();
    }

    @Override
    @Transactional
    public Size getById(int SizeId) {
        return null;
    }

    @Override
    @Transactional
    public Size save(Size size) {
        return this.sizeRepo.save(size);
    }

    @Override
    @Transactional
    public Size update(Size size) {
        return this.sizeRepo.save(size);
    }

    @Override
    @Transactional
    public void delete(int id) {
        this.sizeRepo.deleteById(id);
    }
}
