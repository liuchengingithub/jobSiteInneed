package com.inneed.backend.bean;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobCategoryTable {
    private Long id;
    private String category;
    private Long grade;
    private Long fatherCategoryId;
    private Long categoryState;
}
