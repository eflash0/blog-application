package com.blog.blog;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
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

import com.blog.blog.dto.UserDto;
import com.blog.blog.entity.Role;
import com.blog.blog.entity.User;
import com.blog.blog.repository.UserRepository;
import com.blog.blog.service.AdminService;

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

    private UserDto userDto;
    private User user;

    @BeforeEach
    void setup(){
        userDto = new UserDto();
        userDto.setUsername("test");
        userDto.setPassword("pass");
        userDto.setEmail("pass@fef.com");

        user = new User();
        user.setUsername("test");
        user.setPassword("pass");
        user.setEmail("pass@fef.com");

    }

    @Test
    void addAdminTest(){
        when(userRepository.findByUsername(anyString())).thenReturn(Optional.empty());
        when(modelMapper.map(userDto,User.class)).thenReturn(user);
        when(userRepository.save(any(User.class))).thenReturn(user);
        when(modelMapper.map(user,UserDto.class)).thenReturn(userDto);
        UserDto rslt = adminService.addAdmin(userDto);
        assertNotNull(rslt);
        assertEquals(rslt.getUsername(),userDto.getUsername());
        assertEquals(rslt.getEmail(),userDto.getEmail());
        assertEquals(Role.ADMIN,rslt.getRole());
    }

    @Test
    void testAddUser_UserAlreadyExists() {
        when(userRepository.findByUsername(userDto.getUsername())).thenReturn(Optional.of(user));
        assertThrows(IllegalArgumentException.class, () -> {
            adminService.addAdmin(userDto);
        });
        verify(userRepository, times(1)).findByUsername(userDto.getUsername());
        verify(userRepository, times(0)).save(any(User.class));
    }

    @Test 
    void signupTest(){

    }
}
