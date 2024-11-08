package com.blog.blog.service;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.blog.blog.dto.UserDto;
import com.blog.blog.dto.UserResponse;
import com.blog.blog.entity.Role;
import com.blog.blog.entity.User;
import com.blog.blog.repository.UserRepository;

@Service
public class AdminService {
    @Autowired
    private UserRepository userRepository;

    @Autowired 
    private ModelMapper modelMapper;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserResponse addAdmin(UserDto userDto){
        Optional<User> existingUser = userRepository.findByUsername(userDto.getUsername());
        if(existingUser.isPresent()){
            throw new IllegalArgumentException("the username already exists");
        }
        existingUser = userRepository.findByEmail(userDto.getEmail());
        if(existingUser.isPresent()){
            throw new IllegalArgumentException("the email already exists");
        }
        User user = modelMapper.map(userDto,User.class);
        user.setRole(Role.ADMIN);
        user.setPassword(bCryptPasswordEncoder.encode(userDto.getPassword()));
        User savedUser = userRepository.save(user);
        return modelMapper.map(savedUser,UserResponse.class);
    }

    public UserResponse addUser(UserDto userDto){
        Optional<User> existingUser = userRepository.findByUsername(userDto.getUsername());
        if(existingUser.isPresent()){
            throw new IllegalArgumentException("the username already exists");
        }
        existingUser = userRepository.findByEmail(userDto.getEmail());
        if(existingUser.isPresent()){
            throw new IllegalArgumentException("the email already exists");
        }
        User user = modelMapper.map(userDto,User.class);
        user.setRole(Role.USER);
        user.setPassword(bCryptPasswordEncoder.encode(userDto.getPassword()));
        User savedUser = userRepository.save(user);
        return modelMapper.map(savedUser,UserResponse.class);
    }

    public List<UserResponse> getAdmins(){
        List<User> admins = userRepository.getUsersByRole(Role.ADMIN);
        return admins.stream().map(admin -> modelMapper
        .map(admin,UserResponse.class)).toList();
    }

    public List<UserResponse> getUsers(){
        List<User> users = userRepository.getUsersByRole(Role.USER);
        return users.stream().map(user -> modelMapper.map(user,UserResponse.class)).toList();
    }

    public UserResponse updateUser(UserDto userDto,Long id){
        User existingUser = userRepository.findById(id).orElseThrow(() ->
        new IllegalArgumentException("user not found"));
        if (userDto.getUsername() != null && !userDto.getUsername().isEmpty()) {
            existingUser.setUsername(userDto.getUsername());
        }
        if (userDto.getPassword() != null && !userDto.getPassword().isEmpty()) {
            existingUser.setPassword(bCryptPasswordEncoder.encode(userDto.getPassword()));
        }
        if (userDto.getEmail() != null && !userDto.getEmail().isEmpty()) {
            existingUser.setEmail(userDto.getEmail());
        }
        if (userDto.getRole() != null) {
            try {
                Role role = Role.valueOf(userDto.getRole().toString().toUpperCase());
                existingUser.setRole(role);
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("Invalid role: " + userDto.getRole());
            }
        }
        userRepository.save(existingUser);
        return modelMapper.map(existingUser,UserResponse.class);
    }

    public void deleteUser(Long id){
        userRepository.deleteById(id);
    }
}
