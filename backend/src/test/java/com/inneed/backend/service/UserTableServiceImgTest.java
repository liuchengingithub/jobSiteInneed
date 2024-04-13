package com.inneed.backend.service;

import com.inneed.backend.bean.UserTable;
import com.inneed.backend.mapper.UserTableMapper;
import net.minidev.json.JSONObject;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class UserTableServiceImgTest {

    private UserTableMapper userTableMapper;

    @BeforeEach
    public void setup() throws Exception {
        userTableMapper = mock(UserTableMapper.class);
        String[] wantjob = {"Web"};
        when(userTableMapper.getUserById(1L)).thenReturn(new UserTable(1L, "satuo", "Qwer4321", "佐藤", 1L, 1L, "男", "18650001234", "satou@gmail.com", wantjob, 1L, "[1, 2, 4]", ""));
    }

    @Test
    public void getUserByIdTest() throws Exception{
        UserTable user = userTableMapper.getUserById(1L);
        System.out.printf(user.toString());
    }

}
