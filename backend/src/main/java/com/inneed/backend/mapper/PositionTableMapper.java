package com.inneed.backend.mapper;

import com.inneed.backend.bean.PositionTable;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PositionTableMapper {
    //根据搜索关键词获取职位列表
    List<PositionTable> getPositionByKeyword(String keyword);

    List<PositionTable> getPositionById(String id);

    List<PositionTable> getPositionByCompanyId(Long companyId);

    boolean updatePosition(PositionTable positionTable, Long positionId);

    boolean updatePositionState(Long positionState, Long positionId);

    void addPosition(PositionTable positionTable);
}
