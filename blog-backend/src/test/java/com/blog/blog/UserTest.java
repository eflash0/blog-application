package com.blog.blog;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.modelmapper.ModelMapper;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.blog.blog.dto.SignupRequest;
import com.blog.blog.dto.UserDto;
import com.blog.blog.entity.Role;
import com.blog.blog.entity.User;
import com.blog.blog.repository.UserRepository;
import com.blog.blog.service.AdminService;
import com.blog.blog.service.UserService;

@SpringBootTest
public class UserTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private ModelMapper modelMapper;
    
    @Mock
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @InjectMocks
    private AdminService adminService;

    @InjectMocks
    private UserService userService;

    private UserDto userDto;
    private User user;
    private SignupRequest signupRequest;

    @BeforeEach
    void setup(){
        userDto = new UserDto();
        userDto.setUsername("test");
        userDto.setPassword("pass");
        userDto.setEmail("test@gmail.com");

        user = new User();
        user.setUsername("test");
        user.setPassword("pass");
        user.setEmail("test@gmail.com");

        signupRequest = new SignupRequest();
        signupRequest.setUsername("test");
        signupRequest.setEmail("test@gmail.com");
        signupRequest.setPassword("pass");
        signupRequest.setConfirmPassword("pass");
    }

    @Test
    void addAdminSuccessfullyTest(){
        when(userRepository.findByUsername(anyString())).thenReturn(Optional.empty());
        when(modelMapper.map(userDto,User.class)).thenReturn(user);
        when(userRepository.save(any(User.class))).thenReturn(user);
        when(modelMapper.map(any(User.class),eq(UserDto.class))).thenAnswer(
            invocation -> {
                User sourceUser = invocation.getArgument(0);
                UserDto mappedDto = new UserDto();
                mappedDto.setUsername(sourceUser.getUsername());
                mappedDto.setEmail(sourceUser.getEmail());
                mappedDto.setRole(sourceUser.getRole());
                return mappedDto;
            }
        );
        UserDto rslt = adminService.addAdmin(userDto);
        assertNotNull(rslt);
        assertEquals(rslt.getUsername(),userDto.getUsername());
        assertEquals(rslt.getEmail(),userDto.getEmail());
        assertEquals("ADMIN",rslt.getRole().name());
    }

    @Test
    void AdminAlreadyExistsTest() {
        when(userRepository.findByUsername(userDto.getUsername())).thenReturn(Optional.of(user));
        assertThrows(IllegalArgumentException.class, () -> {
            adminService.addAdmin(userDto);
        });
        verify(userRepository, times(1)).findByUsername(userDto.getUsername());
        verify(userRepository, times(0)).save(any(User.class));
    }

    @Test 
    void signupTest(){

        User savedUser = new User();
        savedUser.setUsername("test");
        savedUser.setPassword("pass");
        savedUser.setEmail("test@gmail.com");
        savedUser.setRole(Role.USER);

        UserDto userDto = new UserDto();

        when(userRepository.findByUsername("test")).thenReturn(Optional.empty());
        when(userRepository.findByEmail("test@gmail.com")).thenReturn(Optional.empty());
        when(bCryptPasswordEncoder.encode(signupRequest.getPassword())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(savedUser);
        when(modelMapper.map(savedUser, UserDto.class)).thenReturn(userDto);

        UserDto result = userService.signup(signupRequest);

        assertNotNull(result);
        verify(userRepository).save(any(User.class));
        verify(modelMapper).map(savedUser, UserDto.class);
    }
}
