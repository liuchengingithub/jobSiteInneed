package com.inneed.backend.bean;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationTable {
    private Long id;
    private Long positionId;
    private String positionName;
    private Long companyId;
    private String companyName;
    private Long userId;
    private String userName;
    private Long resumeId;
    private Long applyState;
    private PositionTable positionDetail;
}
