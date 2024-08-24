package com.blog.blog.dto;

import com.blog.blog.entity.Role;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class UserDto {
    private Long userId;
    private String username;
    private String email;
    private String password;
    private Role role;
}
