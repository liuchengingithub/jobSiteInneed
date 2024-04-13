package com.inneed.backend.mapper;

import com.inneed.backend.bean.RoleTable;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface RoleTableMapper {
    String getRightsByRoleId(Long id);

}
