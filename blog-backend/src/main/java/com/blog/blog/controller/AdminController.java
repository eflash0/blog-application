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
import com.blog.blog.service.AdminService;

@RestController
@RequestMapping(path = "/admins")
public class AdminController {
    @Autowired
    private AdminService adminService;

    @PostMapping
    public ResponseEntity<UserDto> addAdmin(@RequestBody UserDto userDto){
        UserDto admin = adminService.addAdmin(userDto);
        return ResponseEntity.ok(admin);
    }

    @GetMapping("/getAdmins")
    public ResponseEntity<List<UserDto>> getAdmins(){
        List<UserDto> admins = adminService.getAdmins();
        return ResponseEntity.ok(admins);
    }

    @GetMapping("/getUsers")
    public ResponseEntity<List<UserDto>> getUsers(){
        List<UserDto> admins = adminService.getUsers();
        return ResponseEntity.ok(admins);
    }

    @PutMapping("/getAdmins/{id}")
    public ResponseEntity<UserDto> updateAdmin(@RequestBody UserDto admin,@PathVariable Long id){
        UserDto updatedAdmin = adminService.updateUser(admin, id);
        return ResponseEntity.ok(updatedAdmin);
    }

    @DeleteMapping("/getAdmins/{id}")
    public ResponseEntity<Void> deleteAdmin(@PathVariable Long id){
        adminService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/getUsers/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id){
        adminService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }    
}
