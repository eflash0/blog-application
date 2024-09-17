package com.blog.blog.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.blog.blog.dto.UserDto;
import com.blog.blog.repository.UserRepository;
import com.blog.blog.service.AdminService;


@Configuration
public class AppConfig {

    @Bean
    public CommandLineRunner commandLineRunner(AdminService adminService,UserRepository userRepository){
        return args ->{
            if(!userRepository.findByUsername("abdo").isPresent()){
                UserDto abdo = new UserDto();
                abdo.setUsername("abdo");
                abdo.setPassword("fr");
                abdo.setEmail("foj@gmail.com");
                adminService.addAdmin(abdo);
            }
        };
    }
}
