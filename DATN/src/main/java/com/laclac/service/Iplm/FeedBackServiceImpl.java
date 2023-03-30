package com.laclac.service.Iplm;

import com.laclac.entity.Feedback;
import com.laclac.repository.FeedbackRepository;
import com.laclac.service.FeedBackService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class FeedBackServiceImpl implements FeedBackService {

    private final FeedbackRepository repository;

    public FeedBackServiceImpl(FeedbackRepository repository) {
        this.repository = repository;
    }

    @Override
    @Transactional
    public List<Feedback> getAll() {
        return null;
    }

    @Override
    @Transactional
    public List<Feedback> getAllByProductId(int productId) {
        return null;
    }

    @Override
    @Transactional
    public List<Feedback> getAllByUserId(int userId) {
        return null;
    }

    @Override
    @Transactional
    public Feedback getById(int FeedbackId) {
        return null;
    }

    @Override
    @Transactional
    public Feedback save(Feedback feedback) {
        return null;
    }

    @Override
    @Transactional
    public Feedback update(Feedback feedback) {
        return null;
    }

    @Override
    @Transactional
    public Feedback delete(int id) {
        return null;
    }

    @Override
    public Long countId() {
        long a = repository.findAll().size();
      return  a;

    }
}
