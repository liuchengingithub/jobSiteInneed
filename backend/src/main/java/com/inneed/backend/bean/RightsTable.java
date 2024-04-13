package com.inneed.backend.bean;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RightsTable {
    private Long id;
    private String title;
    private String path;
    private int pagepermission;
    private int grade;
    private int fatherRightId;
}
