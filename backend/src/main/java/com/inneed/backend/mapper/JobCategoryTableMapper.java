package com.inneed.backend.mapper;

import com.inneed.backend.bean.JobCategoryTable;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface JobCategoryTableMapper {
    List<JobCategoryTable> getAllJobCategory();

    JobCategoryTable getJobCategory(String category);

    List<JobCategoryTable> getCategoryAndChildren(Long id);

    boolean addCategory(JobCategoryTable jobCategoryTable);

    boolean deleteCategory(Long id, Long grade);

    boolean updateCategory(Long id, String category, Long categoryState, Long grade);

}
