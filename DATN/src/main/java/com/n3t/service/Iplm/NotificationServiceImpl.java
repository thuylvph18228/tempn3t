package com.n3t.service.Iplm;

import com.n3t.entity.Notification;
import com.n3t.service.NotificationService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {
    @Override
    @Transactional
    public List<Notification> getAll() {
        return null;
    }

    @Override
    @Transactional
    public Notification save(Notification notification) {
        return null;
    }

    @Override
    @Transactional
    public Notification update(Notification notification) {
        return null;
    }

    @Override
    @Transactional
    public Notification delete(int id) {
        return null;
    }
}
