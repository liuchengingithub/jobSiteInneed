package com.inneed.backend.controller;

import com.inneed.backend.bean.ApplicationTable;
import com.inneed.backend.service.ApplicationTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ApplicationController {

    @Autowired
    ApplicationTableService applicationTableService;

    @GetMapping("/getApplicationByUserId/{userId}")
    public List<ApplicationTable> getApplicationByUserId(@PathVariable("userId") Long userId){
        return applicationTableService.getApplicationByUserId(userId);
    }

    @PostMapping("/addApplication")
    public boolean addApplication(@RequestBody ApplicationTable applicationTable){
        return applicationTableService.insertApplication(applicationTable);
    }

    @GetMapping("/getApplicationByCompanyId/{companyId}")
    public List<ApplicationTable> getApplicationByCompanyId(@PathVariable("companyId") Long companyId){
        return applicationTableService.getApplicationByCompanyId(companyId);
    }


    @PatchMapping("/updateApplication/{applicationId}")
    public void updateApplication(@RequestBody ApplicationTable applicationTable, @PathVariable("applicationId") Long applicationId){
        applicationTableService.updateApplication(applicationTable, applicationId);
    }
}
