package com.inneed.backend.service.impl;

import com.inneed.backend.bean.RoleTable;
import com.inneed.backend.mapper.RoleTableMapper;
import com.inneed.backend.service.RoleTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class RoleTableServiceImg implements RoleTableService {

    @Autowired
    RoleTableMapper roleTableMapper;

    @Override
    public String getRightsByRoleId(Long id) {
        return roleTableMapper.getRightsByRoleId(id);
    }
}
