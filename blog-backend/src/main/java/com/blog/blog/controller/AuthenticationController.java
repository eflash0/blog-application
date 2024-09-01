package com.blog.blog.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blog.blog.dto.JwtResponse;
import com.blog.blog.dto.SignupRequest;
import com.blog.blog.dto.UserDto;
import com.blog.blog.security.JwtUtil;
import com.blog.blog.service.AuthenticationService;
import com.blog.blog.service.UserService;

@RestController
@RequestMapping(path = "/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDto user){
        String token = authenticationService.login(user);
        return ResponseEntity.ok(new JwtResponse(token));
    }

    @PostMapping("/signup")
    public ResponseEntity<UserDto> singnup(@RequestBody SignupRequest signupRequest){
        UserDto userDto = userService.signup(signupRequest);
        return ResponseEntity.ok(userDto);
    }

    @PostMapping("/validate-token")
    public ResponseEntity<Boolean> validateToke(@RequestBody String token){
        Boolean valid = jwtUtil.validateToken(token);
        return ResponseEntity.ok(valid);
    }
}
