package com.inneed.backend.mapper;

import com.inneed.backend.bean.RightsTable;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface RightsTableMapper {
    List<RightsTable> getRights();
}
