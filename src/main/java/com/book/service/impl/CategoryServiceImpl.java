package com.book.service.impl;

import com.book.entity.Category;
import com.book.mapper.CategoryMapper;
import com.book.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    CategoryMapper categoryMapper;

    @Override
    public Category selectByPrimaryKey(Integer id) {
        return categoryMapper.selectByPrimaryKey(id);
    }
}
