package com.n3t.service;

import com.n3t.DTO.ImageDto;
import com.n3t.entity.Image;

import java.util.List;

public interface ImageService {
    List<Image> getAll();
    List<Image> getAllByProductId(int ImageId);
    Image getById(int ImageId);
    List<ImageDto> saveAll(List<ImageDto> image);
    Image update(Image image);
    void delete(int id);
}
