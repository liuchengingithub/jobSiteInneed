package com.inneed.backend.service.impl;

import com.inneed.backend.bean.ApplicationTable;
import com.inneed.backend.mapper.ApplicationTableMapper;
import com.inneed.backend.service.ApplicationTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationTableServiceImg implements ApplicationTableService {

    @Autowired
    ApplicationTableMapper applicationTableMapper;

    @Override
    public List<ApplicationTable> getApplicationByUserId(Long userId) {
        return applicationTableMapper.getApplicationByUserId(userId);
    }

    @Override
    public boolean insertApplication(ApplicationTable applicationTable) {
        return applicationTableMapper.insertApplication(applicationTable);
    }

    @Override
    public List<ApplicationTable> getApplicationByCompanyId(Long companyId) {
        return applicationTableMapper.getApplicationByCompanyId(companyId);
    }

    @Override
    public boolean updateApplication(ApplicationTable applicationTable, Long applicationId) {
        return applicationTableMapper.updateApplication(applicationTable, applicationId);
    }
}
