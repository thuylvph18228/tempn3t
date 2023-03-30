package com.laclac.service;

import com.laclac.DTO.ImageDto;
import com.laclac.entity.Image;

import java.util.List;

public interface ImageService {
    List<Image> getAll();
    List<Image> getAllByProductId(int ImageId);
    Image getById(int ImageId);
    List<ImageDto> saveAll(List<ImageDto> image);
    Image update(Image image);
    void delete(int id);
}
