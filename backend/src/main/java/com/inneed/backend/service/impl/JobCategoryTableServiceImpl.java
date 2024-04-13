package com.inneed.backend.service.impl;

import com.inneed.backend.bean.JobCategoryTable;
import com.inneed.backend.mapper.JobCategoryTableMapper;
import com.inneed.backend.service.JobCategoryTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobCategoryTableServiceImpl implements JobCategoryTableService {

    @Autowired
    JobCategoryTableMapper jobCategoryTableMapper;

    @Override
    public List<JobCategoryTable> getAllJobCategory() {
        return jobCategoryTableMapper.getAllJobCategory();
    }

    @Override
    public JobCategoryTable getJobCategory(String category) {
        return jobCategoryTableMapper.getJobCategory(category);
    }

    @Override
    public List<JobCategoryTable> getCategoryAndChildren(Long id) {
        return jobCategoryTableMapper.getCategoryAndChildren(id);
    }

    @Override
    public boolean addCategory(JobCategoryTable jobCategoryTable) {
        return jobCategoryTableMapper.addCategory(jobCategoryTable);
    }

    @Override
    public boolean deleteCategory(Long id, Long grade) {
        return jobCategoryTableMapper.deleteCategory(id, grade);
    }

    @Override
    public boolean updateCategory(Long id, String category, Long categoryState, Long grade) {
        return jobCategoryTableMapper.updateCategory(id, category, categoryState, grade);
    }
}
