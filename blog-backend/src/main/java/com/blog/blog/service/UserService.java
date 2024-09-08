package com.blog.blog.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.Files;
import java.io.IOException;

import com.blog.blog.dto.PostDto;
import com.blog.blog.dto.SignupRequest;
import com.blog.blog.dto.UserDto;
import com.blog.blog.entity.Post;
import com.blog.blog.entity.Role;
import com.blog.blog.entity.User;
import com.blog.blog.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class UserService implements UserDetailsService{
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Value("${file.upload-dir}")
    private String uploadDir;
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username.trim()).orElseThrow(() -> 
        new UsernameNotFoundException("user not found"));
    }

    public UserDto signup(SignupRequest signupRequest){
        Optional<User> existingUser = userRepository.findByUsername(signupRequest.getUsername());
        if(existingUser.isPresent()){
            throw new IllegalArgumentException("the username already exists");
        }
        existingUser = userRepository.findByEmail(signupRequest.getEmail());
        if(existingUser.isPresent()){
            throw new IllegalArgumentException("the email already exists");
        }
        if(!signupRequest.getPassword().equals(signupRequest.getConfirmPassword())){
            throw new IllegalArgumentException("the password and the confirm password must be equals");
        }
        User user = new User();
        user.setUsername(signupRequest.getUsername());
        user.setPassword(signupRequest.getPassword());
        user.setEmail(signupRequest.getEmail());
        user.setRole(Role.USER);
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);
        return modelMapper.map(savedUser,UserDto.class);
    }

    public List<PostDto> getUserPosts(Long id){
        User existingUser = userRepository.findById(id).orElseThrow(() ->
        new IllegalArgumentException("user not found"));
        List<Post> posts = existingUser.getPosts();
        return posts.stream().map(post -> modelMapper.map(post,PostDto.class)).toList();
    }

    public UserDto getUserById(Long id){
        User user = userRepository.findById(id).orElseThrow(() -> 
        new IllegalArgumentException("user not found"));
        return modelMapper.map(user,UserDto.class);
    }

    public UserDto getUserByUsername(String username){
        User user = userRepository.findByUsername(username).orElseThrow(() -> 
        new IllegalArgumentException("user not found"));
        return modelMapper.map(user,UserDto.class);
    }

    @Transactional
    public UserDto changeProfilePicture(Long idUser, MultipartFile imageFile) {
        User user = userRepository.findById(idUser).orElseThrow(() ->
            new IllegalArgumentException("user not found"));

        if (imageFile != null && !imageFile.isEmpty()) {
            String fileName = imageFile.getOriginalFilename();
            if (fileName != null && uploadDir != null) {
                Path uploadDirectory = Paths.get(uploadDir);
                String uniqueFileName = UUID.randomUUID().toString() + "_" + fileName;
                Path filePath = uploadDirectory.resolve(fileName);

                try {
                    Files.createDirectories(uploadDirectory);
                    Files.write(filePath, imageFile.getBytes()); 
                    user.setImage(fileName);
                    userRepository.save(user);
                } catch (IOException e) {
                    throw new RuntimeException("Failed to store file: " + e.getMessage(), e);
                }
            }
        }
        return modelMapper.map(user, UserDto.class);
    }

}
