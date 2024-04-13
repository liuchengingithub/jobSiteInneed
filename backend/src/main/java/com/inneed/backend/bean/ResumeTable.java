package com.inneed.backend.bean;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResumeTable {
    private Long id;
    private Long userId;
    private String name;
    private Date birthDate;
    private String gender;
    private String phoneNumber;
    private String email;
    private String city;
    private String experience;
}
