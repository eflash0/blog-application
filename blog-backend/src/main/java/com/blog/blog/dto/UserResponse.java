package com.blog.blog.dto;


import com.blog.blog.entity.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserResponse {
    private Long userId;
    private String username;
    private String email;
    private Role role;
}
