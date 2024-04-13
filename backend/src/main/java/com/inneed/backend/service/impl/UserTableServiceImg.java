package com.inneed.backend.service.impl;

import com.inneed.backend.bean.UserTable;
import com.inneed.backend.mapper.UserTableMapper;
import com.inneed.backend.service.UserTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserTableServiceImg implements UserTableService {

    @Autowired
    UserTableMapper userTableMapper;


    @Override
    public boolean updateUserApplyList(String applications, Long userId) {
        return userTableMapper.updateUserApplyList(applications, userId);
    }

    @Override
    public UserTable getUserById(Long userId) {
        return userTableMapper.getUserById(userId);
    }

    @Override
    public UserTable getUserByUsername(String username) {
        return userTableMapper.getUserByUsername(username);
    }

    @Override
    public List<UserTable> getAllUsers() {
        return userTableMapper.getAllUsers();
    }

    @Override
    public UserTable login(String username, String password) {
        return userTableMapper.login(username, password);
    }

    @Override
    public boolean updateResumeId(Long resumeId, Long userId) {
        return userTableMapper.updateResumeId(resumeId, userId);
    }

    @Override
    public boolean addUser(UserTable userTable) {
        return userTableMapper.addUser(userTable);
    }

    @Override
    public boolean updateRoleState(Long roleId, Long userId) {
        return userTableMapper.updateRoleState(roleId, userId);
    }
}
