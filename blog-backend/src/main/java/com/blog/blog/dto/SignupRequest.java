package com.blog.blog.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import lombok.NonNull;

public class SignupRequest {
    @Column(unique = true)
    String username;
    @Email(message = "invalid email")
    String email;
    @NonNull
    String password;
}
