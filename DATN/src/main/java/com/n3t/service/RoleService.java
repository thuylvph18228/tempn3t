package com.n3t.service;

import com.n3t.entity.Role;

import java.util.List;

public interface RoleService {
    List<Role> getAll();
    Role getById(int RoleId);
    Role save(Role role);
    Role update(Role role);
    Role delete(int id);
}
