package com.blog.blog.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blog.blog.dto.ContactRequest;
import com.blog.blog.dto.ContactResponse;
import com.blog.blog.service.EmailService;

@RestController
@RequestMapping("/contact")
public class ContactController {
    @Autowired
    private EmailService emailService;

    @PostMapping("/send-mail")
    public ResponseEntity<ContactResponse> sendEmail(@RequestBody ContactRequest contactRequest){
        emailService.sendEmail(contactRequest);
        return ResponseEntity.ok(new ContactResponse("Message sent successfully"));
    }
}
