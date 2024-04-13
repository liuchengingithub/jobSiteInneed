package com.inneed.backend.service.impl;

import com.inneed.backend.bean.ResumeTable;
import com.inneed.backend.mapper.ResumeTableMapper;
import com.inneed.backend.service.ResumeTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.imageio.spi.RegisterableService;

@Service
public class ResumeTableServiceImpl implements ResumeTableService {

    @Autowired
    ResumeTableMapper resumeTableMapper;

    @Override
    public ResumeTable getResumeById(Long resumeId) {
        return resumeTableMapper.getResumeById(resumeId);
    }

    @Override
    public boolean updateResume(ResumeTable resumeTable, Long resumeId) {
        return resumeTableMapper.updateResume(resumeTable, resumeId);
    }

    @Override
    public void addResume(ResumeTable resumeTable) {resumeTableMapper.addResume(resumeTable);
    }

    @Override
    public Long getResumeId(Long userId) {
        return resumeTableMapper.getResumeId(userId);
    }
}
