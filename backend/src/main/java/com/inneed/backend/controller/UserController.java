package com.inneed.backend.controller;

import com.inneed.backend.bean.UserTable;
import com.inneed.backend.service.UserTableService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
public class UserController {

    @Autowired
    UserTableService userTableService;

    @PatchMapping("/updateUserApplyList/{userId}")
    public void updateUserApplyList(@RequestBody Map<String, List<Long>> map, @PathVariable("userId") Long userId){
        String applicationsString = map.get("applications").toString();
        userTableService.updateUserApplyList(applicationsString, userId);
    }

    @GetMapping("/getUserById/{userId}")
    public UserTable getUserById(@PathVariable("userId") Long userId){
        return userTableService.getUserById(userId);
    }

    @GetMapping("/getUserByUsername/user={username}")
    public UserTable getUserByUsername(@PathVariable("username") String username){
        return userTableService.getUserByUsername(username);
    }

    @GetMapping("/getAllUsers")
    public List<UserTable> getAllUsers(){
        return userTableService.getAllUsers();
    }

    @PostMapping("/userLogin")
    public UserTable login(@RequestBody Map<String, String> map){
        String username = map.get("username");
        String password = map.get("password");
        UserTable loginUser = userTableService.login(username, password);
        return loginUser;
    }

    @PatchMapping("/updateResumeId")
    public void updateResumeId(@RequestBody Map<String, Long> map){
        Long resumeId = map.get("resumeId");
        Long userId = map.get("userId");
        userTableService.updateResumeId(resumeId, userId);
    }

    @PostMapping("/userRegister")
    public boolean register(@RequestBody UserTable userTable){

        return userTableService.addUser(userTable);
    }

    @PatchMapping("/updateRoleState/{id}")
    public void updateRoleState(@RequestBody Map<String, Long> map, @PathVariable("id") Long userId){
        Long roleId = map.get("roleId");
        userTableService.updateRoleState(roleId, userId);
    }
}