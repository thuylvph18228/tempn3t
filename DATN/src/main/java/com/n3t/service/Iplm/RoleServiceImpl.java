package com.n3t.service.Iplm;

import com.n3t.entity.Role;
import com.n3t.service.RoleService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {
    @Override
    @Transactional
    public List<Role> getAll() {
        return null;
    }

    @Override
    @Transactional
    public Role getById(int RoleId) {
        return null;
    }

    @Override
    @Transactional
    public Role save(Role role) {
        return null;
    }

    @Override
    @Transactional
    public Role update(Role role) {
        return null;
    }

    @Override
    @Transactional
    public Role delete(int id) {
        return null;
    }
}
