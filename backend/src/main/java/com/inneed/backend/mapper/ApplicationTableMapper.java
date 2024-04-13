package com.inneed.backend.mapper;

import com.inneed.backend.bean.ApplicationTable;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ApplicationTableMapper {
    List<ApplicationTable> getApplicationByUserId(Long userId);

    boolean insertApplication(ApplicationTable applicationTable);

    List<ApplicationTable> getApplicationByCompanyId(Long companyId);


    boolean updateApplication(ApplicationTable applicationTable, Long applicationId);
}
