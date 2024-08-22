package com.blog.blog.dto;

import com.blog.blog.entity.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserDto {
    Long userId;
    String username;
    String email;
    String password;
    Role role;
}
