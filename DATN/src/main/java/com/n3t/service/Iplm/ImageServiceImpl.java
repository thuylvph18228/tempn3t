package com.n3t.service.Iplm;

import com.n3t.DTO.ImageDto;
import com.n3t.entity.Image;
import com.n3t.repository.ImageRepository;
import com.n3t.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ImageServiceImpl implements ImageService {

    @Autowired
    private ImageRepository imageRepo;

    @Override
    @Transactional
    public List<Image> getAll() {
        return null;
    }

    @Override
    @Transactional
    public List<Image> getAllByProductId(int ImageId) {
        return null;
    }

    @Override
    @Transactional
    public Image getById(int ImageId) {
        return null;
    }

    @Override
    @Transactional
    public List<ImageDto> saveAll(List<ImageDto> images) {
        List<Image> imageList = images.stream().map(Image::toEntity).collect(Collectors.toList());
        return this.imageRepo.saveAll(imageList).stream().map(Image :: toDto).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public Image update(Image image) {
        return null;
    }

    @Override
    @Transactional
    public void delete(int id) {
        this.imageRepo.deleteById(id);
    }
}
