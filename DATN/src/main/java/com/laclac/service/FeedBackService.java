package com.laclac.service;

import com.laclac.entity.Feedback;

import java.util.List;
public interface FeedBackService {
    List<Feedback> getAll();
    List<Feedback> getAllByProductId(int productId);
    List<Feedback> getAllByUserId(int userId);
    Feedback getById(int FeedbackId);
    Feedback save(Feedback feedback);
    Feedback update(Feedback feedback);
    Feedback delete(int id);

    Long countId();
}
