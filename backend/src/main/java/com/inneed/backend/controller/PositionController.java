package com.inneed.backend.controller;

import com.inneed.backend.bean.PositionTable;
import com.inneed.backend.bean.ResumeTable;
import com.inneed.backend.service.PositionTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PositionController {
    @Autowired
    PositionTableService positionTableService;

    @GetMapping("/getPositionByKeyword/key={keyword}")
    public List<PositionTable> getPositionByKeyword(@PathVariable("keyword") String keyword){
        return positionTableService.getPositionByKeyword(keyword);
    }

    @GetMapping("/getPositionById/id={id}")
    public List<PositionTable> getPositionById(@PathVariable("id") String id){
        return positionTableService.getPositionById(id);
    }

    @GetMapping("/getPositionByCompanyId/{companyId}")
    public List<PositionTable> getPositionByCompanyId(@PathVariable("companyId") Long companyId) {
        return positionTableService.getPositionByCompanyId(companyId);
    }

    @PatchMapping("/updatePosition/{positionId}")
    public void updatePosition(@RequestBody PositionTable positionTable, @PathVariable("positionId") Long positionId){
        positionTableService.updatePosition(positionTable, positionId);
    }


    @PostMapping("/addPosition")
    public void addPosition(@RequestBody PositionTable positionTable){
        positionTableService.addPosition(positionTable);
    }
}
