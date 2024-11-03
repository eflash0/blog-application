package com.blog.blog.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.blog.blog.dto.UserDto;
import com.blog.blog.dto.UserResponse;
import com.blog.blog.service.AdminService;

@RestController
@RequestMapping(path = "/admins")
public class AdminController {
    @Autowired
    private AdminService adminService;

    @PostMapping("/addAdmin")
    public ResponseEntity<UserResponse> addAdmin(@RequestBody UserDto userDto){
        UserResponse admin = adminService.addAdmin(userDto);
        return ResponseEntity.ok(admin);
    }

    @PostMapping("/addUser")
    public ResponseEntity<UserResponse> addUser(@RequestBody UserDto userDto){
        UserResponse user = adminService.addUser(userDto);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/getAdmins")
    public ResponseEntity<List<UserResponse>> getAdmins(){
        List<UserResponse> admins = adminService.getAdmins();
        return ResponseEntity.ok(admins);
    }

    

    @GetMapping("/getUsers")
    public ResponseEntity<List<UserResponse>> getUsers(){
        List<UserResponse> admins = adminService.getUsers();
        return ResponseEntity.ok(admins);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUser(@RequestBody UserDto user,@PathVariable Long id){
        UserResponse updatedUser = adminService.updateUser(user, id);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdmin(@PathVariable Long id){
        adminService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

}
