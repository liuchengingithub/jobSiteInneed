package com.inneed.backend.controller;

import com.inneed.backend.bean.ResumeTable;
import com.inneed.backend.service.ResumeTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class ResumeController {

    @Autowired
    ResumeTableService resumeTableService;

    @GetMapping("/getResumeById/{resumeId}")
    public ResumeTable getResumeById(@PathVariable("resumeId") Long resumeId){
        return resumeTableService.getResumeById(resumeId);
    }

    @PatchMapping("/updateResume/{resumeId}")
    public void updateResume(@RequestBody ResumeTable resumeTable, @PathVariable("resumeId") Long resumeId){
        resumeTableService.updateResume(resumeTable, resumeId);
    }

    @PostMapping("/addResume")
    public void addResume(@RequestBody ResumeTable resumeTable){
        resumeTableService.addResume(resumeTable);
    }

    @GetMapping("/getResumeId/{userId}")
    public Long getResumeId(@PathVariable("userId") Long userId){
        return resumeTableService.getResumeId(userId);
    }
}
