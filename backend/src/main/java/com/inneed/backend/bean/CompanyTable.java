package com.inneed.backend.bean;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompanyTable {
    private Long id;
    private String username;
    private String password;
    private Long roleId;
    private Long roleState;
    private String companyName;
    private String introduction;
    private String position;
    private String avatar;
    private String rights;
}
