package com.blog.blog.entity;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Table
@Entity
@Getter
@Setter
@AllArgsConstructor
public class Category {
    private Long categoryId;
    private String name;
    
}
