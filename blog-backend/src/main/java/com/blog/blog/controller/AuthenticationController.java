package com.blog.blog.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blog.blog.dto.UserDto;
import com.blog.blog.service.AuthenticationService;
import com.blog.blog.service.UserService;

@RestController
@RequestMapping(path = "/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private UserService userService;

    @RequestMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDto user){
        String token = authenticationService.login(user);
        return ResponseEntity.ok(token);
    }

    @RequestMapping("/signup")
    public ResponseEntity<UserDto> singnup(@RequestBody UserDto user){
        UserDto userDto = userService.signup(user);
        return ResponseEntity.ok(userDto);
    }
}
