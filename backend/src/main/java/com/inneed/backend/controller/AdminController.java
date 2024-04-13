package com.inneed.backend.controller;

import com.inneed.backend.bean.AdminTable;
import com.inneed.backend.service.AdminTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class AdminController {

    @Autowired
    AdminTableService adminTableService;

    @PostMapping("/adminLogin")
    public AdminTable login(@RequestBody Map<String, String> map){
        String username = map.get("username");
        String password = map.get("password");
        AdminTable loginAdmin = adminTableService.login(username, password);
        return loginAdmin;
    }
}
