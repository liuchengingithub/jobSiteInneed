package com.inneed.backend.service.impl;

import com.inneed.backend.bean.AdminTable;
import com.inneed.backend.mapper.AdminTableMapper;
import com.inneed.backend.service.AdminTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminTableServiceImg implements AdminTableService {

    @Autowired
    AdminTableMapper adminTableMapper;

    @Override
    public AdminTable login(String username, String password) {
        return adminTableMapper.login(username, password);
    }
}
