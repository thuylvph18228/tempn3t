package com.laclac.service;

import com.laclac.entity.Role;

import java.util.List;

public interface RoleService {
    List<Role> getAll();
    Role getById(int RoleId);
    Role save(Role role);
    Role update(Role role);
    Role delete(int id);
}
