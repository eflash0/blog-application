package com.blog.blog.service;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.blog.blog.dto.PostDto;
import com.blog.blog.dto.UserDto;
import com.blog.blog.entity.Post;
import com.blog.blog.entity.Role;
import com.blog.blog.entity.User;
import com.blog.blog.repository.UserRepository;

@Service
public class UserService implements UserDetailsService{
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username.trim()).orElseThrow(() -> 
        new UsernameNotFoundException("user not found"));
    }

    public UserDto signup(UserDto userDto){
        Optional<User> existingUser = userRepository.findByUsername(userDto.getUsername());
        if(existingUser.isPresent()){
            throw new IllegalArgumentException("the username already exists");
        }
        existingUser = userRepository.findByEmail(userDto.getEmail());
        if(existingUser.isPresent()){
            throw new IllegalArgumentException("the email already exists");
        }
        User user = modelMapper.map(existingUser,User.class);
        user.setRole(Role.USER);
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);
        return modelMapper.map(savedUser,UserDto.class);
    }

    public List<UserDto> getUsers(){
        List<User> users = userRepository.getUsersByRole(Role.USER);
        return users.stream().map(user -> modelMapper.map(user,UserDto.class)).toList();
    }

    public List<PostDto> getUserPosts(Long id){
        User existingUser = userRepository.findById(id).orElseThrow(() ->
        new IllegalArgumentException("user not found"));
        List<Post> posts = existingUser.getPosts();
        return posts.stream().map(post -> modelMapper.map(post,PostDto.class)).toList();
    }
}
