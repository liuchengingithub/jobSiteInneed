package com.inneed.backend.mapper;

import com.inneed.backend.bean.AdminTable;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AdminTableMapper {
    AdminTable login(String username, String password);
}
