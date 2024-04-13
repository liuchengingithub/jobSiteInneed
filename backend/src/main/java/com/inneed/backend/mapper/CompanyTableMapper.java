package com.inneed.backend.mapper;

import com.inneed.backend.bean.CompanyTable;
import com.inneed.backend.bean.UserTable;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CompanyTableMapper {
    CompanyTable login(String username, String password);

    boolean addCompany(CompanyTable companyTable);

    CompanyTable getCompanyByCompanyName(String companyName);

    List<CompanyTable> getAllCompanies();
}
