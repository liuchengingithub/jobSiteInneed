package com.inneed.backend.bean;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoleTable {
    private Long id;
    private String roleName;
    private Long roleType;
    private String rights;
}
