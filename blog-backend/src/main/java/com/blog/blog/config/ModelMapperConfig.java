package com.blog.blog.config;

import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.blog.blog.dto.PostDto;
import com.blog.blog.entity.Post;

@Configuration
public class ModelMapperConfig {
    @Bean
    public ModelMapper modelMapper(){
        ModelMapper modelMapper = new ModelMapper();

        modelMapper.addMappings(new PropertyMap<Post, PostDto>() {
            @Override
            protected void configure() {
                map().setAuthorId(source.getAuthor().getUserId());
            }
        });

        modelMapper.addMappings(new PropertyMap<PostDto, Post>() {
            @Override
            protected void configure() {}
        });

        return modelMapper;
    }
}
