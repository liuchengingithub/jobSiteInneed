package com.inneed.backend.mapper;

import com.inneed.backend.bean.UserTable;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;
import java.util.List;

@Mapper
public interface UserTableMapper {

    boolean updateUserApplyList(String applications, Long userId);

    UserTable getUserById(Long userId);

    UserTable getUserByUsername(String username);

    List<UserTable> getAllUsers();

    boolean updateResumeId(Long resumeId, Long userId);

    UserTable login(String username, String password);

    boolean addUser(UserTable userTable);

    boolean updateRoleState(Long roleId, Long userId);
}
