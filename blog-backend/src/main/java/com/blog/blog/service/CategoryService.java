package com.blog.blog.service;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blog.blog.dto.CategoryDto;
import com.blog.blog.entity.Category;
import com.blog.blog.entity.Post;
import com.blog.blog.repository.CategoryRepository;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ModelMapper modelMapper;

    public Category findCategoryById(Long id){
        return categoryRepository.findById(id).orElseThrow(() ->
        new IllegalArgumentException("category not found"));
    }

    public Category findCategoryByName(String name){
        return categoryRepository.findByName(name).orElseThrow(() ->
            new IllegalArgumentException("category not found")
        );
    }

    public Category addCategory(Category category){
        Optional<Category> existCategory = categoryRepository.findByName(category.getName());
        if(existCategory.isPresent()){
            throw new IllegalArgumentException("the category already exists");
        }
        return categoryRepository.save(category);
    }

    public Category updateCategory(Category category,Long id){
        Category existingCategory = categoryRepository.findById(id).orElseThrow(() ->
        new IllegalArgumentException("category not found"));
        if(category.getName() != null && !category.getName().isEmpty())
            existingCategory.setName(category.getName());
        return categoryRepository.save(existingCategory);
    }

    public void deleteCategoryById(Long id){
        categoryRepository.deleteById(id);
    }

    public List<CategoryDto> getAllCategories(){
        List<Category> categories = categoryRepository.findAll();
        return categories.stream().map(category -> modelMapper
        .map(category,CategoryDto.class)).toList(); 
    }
    
    public List<Post> getPostsByCategory(Long categoryId){
        return categoryRepository.findById(categoryId).orElseThrow(() ->
        new IllegalArgumentException("category not found")).getPosts();
    }
}
