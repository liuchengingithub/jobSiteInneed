package com.inneed.backend.controller;

import com.inneed.backend.BackendApplicationTests;
import com.inneed.backend.bean.UserTable;

import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.Map;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class UserControllerTest extends BackendApplicationTests{

    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext wac;

    @BeforeEach
    public void setup() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build();
    }

    @Test
    public void getUserById() throws Exception{
        Long id = 40L;
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/getUserById/"+id))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        System.out.printf(result.getResponse().getContentAsString());
    }

//    @Test
//    public void register() throws Exception{
//        UserTable user = new UserTable();
//        user.setId(4L);
//        user.setUsername("yamada");
//        user.setPassword("Qwer4321");
//        user.setRoleId(1L);
//
//        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/userRegister")
//                .contentType(MediaType.APPLICATION_JSON).content()
//                .andExpect(status().isOk())
//                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
//                .andReturn();
//
//        System.out.printf(result.getResponse().getContentAsString());
//    }

}
