package com.inneed.backend.bean;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PositionTable {
    public Long id;
    public String positionName;
    public Long companyId;
    public String companyName;
    public String city;
    public String jobCategory;
    public String year;
    public String minSalary;
    public String maxSalary;
    public String education;
    public String description;
    public Date postDate;
    public int positionState;
}
