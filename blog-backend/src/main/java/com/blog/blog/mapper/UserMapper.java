package com.blog.blog.mapper;

import com.blog.blog.dto.UserDto;
import com.blog.blog.entity.User;

public class UserMapper {
    public static UserDto toDto(User user) {
        return new UserDto(user.getUserId(),user.getUsername(),user.getEmail(),
        user.getPassword(),user.getRole());
    }

    public static User toUser(UserDto userDto){
        return new User(userDto.getUserId(),userDto.getUsername(),userDto.getEmail(),
        userDto.getPassword(),userDto.getRole());
    }
}
