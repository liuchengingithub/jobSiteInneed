package com.inneed.backend.service.impl;

import com.inneed.backend.bean.PositionTable;
import com.inneed.backend.mapper.PositionTableMapper;
import com.inneed.backend.service.PositionTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PositionTableServiceImpl implements PositionTableService {

    @Autowired
    PositionTableMapper positionTableMapper;

    @Override
    public List<PositionTable> getPositionByKeyword(String keyword) {
        return positionTableMapper.getPositionByKeyword(keyword);
    }

    @Override
    public List<PositionTable> getPositionById(String id) {
        return positionTableMapper.getPositionById(id);
    }

    @Override
    public List<PositionTable> getPositionByCompanyId(Long companyId) {
        return positionTableMapper.getPositionByCompanyId(companyId);
    }

    @Override
    public boolean updatePosition(PositionTable positionTable, Long positionId) {
        return positionTableMapper.updatePosition(positionTable, positionId);
    }

    @Override
    public boolean updatePositionState(Long positionState, Long positionId) {
        return positionTableMapper.updatePositionState(positionState, positionId);
    }

    @Override
    public void addPosition(PositionTable positionTable) {
        positionTableMapper.addPosition(positionTable);
    }
}
