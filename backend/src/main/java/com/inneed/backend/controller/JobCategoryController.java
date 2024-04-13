package com.inneed.backend.controller;

import com.inneed.backend.bean.JobCategoryTable;
import com.inneed.backend.service.JobCategoryTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class JobCategoryController {
    @Autowired
    JobCategoryTableService jobCategoryTableService;

    @GetMapping("/getAllJobCategory")
    public List<JobCategoryTable> getAllJobCategory(){
        return jobCategoryTableService.getAllJobCategory();
    }

    @GetMapping("/getJobCategory/{category}")
    public JobCategoryTable getJobCategory(@PathVariable("category") String category){
        return jobCategoryTableService.getJobCategory(category);
    }

    @GetMapping("/getCategoryAndChildren/{id}")
    public List<JobCategoryTable> getCategoryAndChildren(@PathVariable("id") Long id){
        return jobCategoryTableService.getCategoryAndChildren(id);
    }

    @PostMapping("/addCategory")
    public boolean addCategory(@RequestBody JobCategoryTable jobCategoryTable){
        return jobCategoryTableService.addCategory(jobCategoryTable);
    }

    @DeleteMapping("/deleteCategory/id={id}&grade={grade}")
    public boolean deleteCategory(@PathVariable("id") Long id, @PathVariable("grade") Long grade){
        return jobCategoryTableService.deleteCategory(id, grade);
    }

    @PatchMapping("/updateCategory/{id}")
    public boolean updateCategory(@PathVariable("id") Long id, @RequestBody Map<String, Object> map){
        String category = map.get("category") == null? null: map.get("category").toString();
        Long categoryState = Long.valueOf(map.get("categoryState").toString());
        Long grade = Long.valueOf(map.get("grade").toString());
        System.out.println(grade);
        return jobCategoryTableService.updateCategory(id, category, categoryState, grade);
    }
}
