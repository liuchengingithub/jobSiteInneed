package com.inneed.backend.service.impl;

import com.inneed.backend.bean.CompanyTable;
import com.inneed.backend.mapper.CompanyTableMapper;
import com.inneed.backend.service.CompanyTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyTableServiceImpl implements CompanyTableService {

    @Autowired
    CompanyTableMapper companyTableMapper;

    @Override
    public CompanyTable login(String username, String password) {
        return companyTableMapper.login(username, password);
    }

    @Override
    public CompanyTable getCompanyByCompanyName(String companyName) {
        return companyTableMapper.getCompanyByCompanyName(companyName);
    }

    @Override
    public boolean addCompany(CompanyTable companyTable) {
        return companyTableMapper.addCompany(companyTable);
    }

    @Override
    public List<CompanyTable> getAllCompanies() {
        return companyTableMapper.getAllCompanies();
    }
}
