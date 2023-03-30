package com.laclac.service;

import com.laclac.entity.UserRole;

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
