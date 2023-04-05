package com.n3t.service;

import com.n3t.entity.Notification;

import java.util.List;

public interface NotificationService {
    List<Notification> getAll();
    Notification save(Notification notification);
    Notification update(Notification notification);
    Notification delete(int id);
}
