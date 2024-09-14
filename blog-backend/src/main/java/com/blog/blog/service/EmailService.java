package com.blog.blog.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.blog.blog.dto.ContactRequest;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(ContactRequest contactRequest){
        try{
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo("recipient@example.com");
            message.setSubject(contactRequest.getSubject());
            message.setText("Name: " + contactRequest.getName() + "\nEmail: " + contactRequest.getEmail() + "\nMessage: " + contactRequest.getMessage());
            mailSender.send(message);
        }
        catch(Exception e){
            e.printStackTrace();
        }
    }
}
