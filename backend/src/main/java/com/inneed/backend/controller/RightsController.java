package com.inneed.backend.controller;

import com.inneed.backend.bean.RightsTable;
import com.inneed.backend.service.RightsTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RightsController {

    @Autowired
    RightsTableService rightsTableService;

    @GetMapping("/getRightsList")
    public List<RightsTable> RightsTableMapper(){
        return rightsTableService.getRights();
    }
}
