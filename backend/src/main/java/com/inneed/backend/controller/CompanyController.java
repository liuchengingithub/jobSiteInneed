package com.inneed.backend.controller;

import com.inneed.backend.bean.CompanyTable;
import com.inneed.backend.service.CompanyTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class CompanyController {

    @Autowired
    CompanyTableService companyTableService;

    @PostMapping("/companyLogin")
    public CompanyTable login(@RequestBody Map<String, String> map){
        String username = map.get("username");
        String password = map.get("password");
        CompanyTable loginCompany = companyTableService.login(username, password);
        return loginCompany;
    }

    @PostMapping("/companyRegister")
    public boolean register(@RequestBody CompanyTable companyTable){
        return companyTableService.addCompany(companyTable);
    }

    @GetMapping("/getCompanyByCompanyName/company={companyName}")
    public CompanyTable getCompanyByCompanyName(@PathVariable("companyName") String companyName){
        return companyTableService.getCompanyByCompanyName(companyName);
    }

    @GetMapping("/getAllCompanies")
    public List<CompanyTable> getAllCompanies(){
        return companyTableService.getAllCompanies();
    }
}
