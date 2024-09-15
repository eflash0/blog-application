package com.blog.blog.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.blog.blog.dto.UserDto;
import com.blog.blog.entity.Category;
import com.blog.blog.entity.Role;
import com.blog.blog.service.AdminService;
import com.blog.blog.service.AuthenticationService;
import com.blog.blog.service.CategoryService;
import com.blog.blog.service.UserService;

@Configuration
public class AppConfig {

    @Bean
    public CommandLineRunner commandLineRunner(AdminService adminService,UserService userService
    ,CategoryService categoryService,AuthenticationService authenticationService){
        return args ->{
            UserDto abdo = new UserDto();
            abdo.setUsername("fr");
            abdo.setPassword("fr");
            abdo.setEmail("fjwepo@gmail.com");
            adminService.addAdmin(abdo);
        };
    }
}
