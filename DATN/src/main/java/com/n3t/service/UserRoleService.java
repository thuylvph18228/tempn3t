package com.n3t.service;

import com.n3t.entity.UserRole;

import java.util.List;

public interface UserRoleService {
    List<UserRole> getAll();
    UserRole getById(int UserRoleId);
    UserRole getByUserId(int UserRoleId);
    UserRole getByRoleId(int UserRoleId);
    UserRole save(UserRole userRole);
    UserRole update(UserRole userRole);
    UserRole delete(int id);
}
