package com.inneed.backend.service.impl;

import com.inneed.backend.bean.RightsTable;
import com.inneed.backend.mapper.RightsTableMapper;
import com.inneed.backend.service.RightsTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RightsTableServiceImg implements RightsTableService {

    @Autowired
    RightsTableMapper rightsTableMapper;

    @Override
    public List<RightsTable> getRights() {
        return rightsTableMapper.getRights();
    }
}
