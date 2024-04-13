package com.inneed.backend.mapper;

import com.inneed.backend.bean.ResumeTable;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ResumeTableMapper {

    ResumeTable getResumeById(Long resumeId);

    boolean updateResume(ResumeTable resumeTable, Long resumeId);

    void addResume(ResumeTable resumeTable);

    Long getResumeId(Long userId);
}
