package com.inneed.backend.bean;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Arrays;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserTable {
    private Long id;
    private String username;
    private String password;
    private String name;
    private Long roleId;
    private Long roleState;
    private String gender;
    private String phoneNumber;
    private String email;
    private String[] wantJob;
    private Long resumeId;
    private String applications;
    private String rights;

}
