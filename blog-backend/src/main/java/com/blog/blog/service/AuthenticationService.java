package com.blog.blog.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blog.blog.dto.UserDto;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;


@Service
public class AuthenticationService {
    @Autowired
    private AuthenticationManager authenticationManager;

    public String login(UserDto userDto){
        try{
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userDto.getUsername(), userDto.getPassword()));
            String role = authentication.getAuthorities().stream()
                .map(authority -> authority.getAuthority()).toString();
            //jwt
            return "";    
        }
        catch(AuthenticationException ex){
            throw new RuntimeException("Login failed: " + ex.getMessage());
        }
    }

}
