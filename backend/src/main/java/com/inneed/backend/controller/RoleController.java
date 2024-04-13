package com.inneed.backend.controller;

import com.inneed.backend.service.RoleTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class RoleController {

    @Autowired
    RoleTableService roleTableService;

    @GetMapping("/getRightsByRoleId/{id}")
    public String getRightsByRoleId(@PathVariable("id") Long id){
        return roleTableService.getRightsByRoleId(id);
    }
}
