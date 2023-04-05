package com.n3t.service.Iplm;

import com.n3t.entity.Color;
import com.n3t.repository.ColorRepository;
import com.n3t.service.ColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ColorServiceImpl implements ColorService {

    @Autowired
    private ColorRepository colorRepo;

    @Override
    @Transactional
    public List<Color> getAll() {
        return this.colorRepo.findAll();
    }

    @Override
    @Transactional
    public Color getById(int ColorId) {
        return null;
    }

    @Override
    @Transactional
    public Color save(Color color) {
        return this.colorRepo.save(color);
    }

    @Override
    @Transactional
    public Color update(Color color) {
        return null;
    }

    @Override
    @Transactional
    public void delete(int id) {
        this.colorRepo.deleteById(id);
    }
}
