package com.book.service.impl;

import com.book.entity.Book;
import com.book.mapper.BookMapper;
import com.book.service.BookDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookDetailServiceImpl implements BookDetailService {

    @Autowired
    BookMapper bookMapper;

    @Override
    public Book getBookById(Integer id) {
        return bookMapper.getBookById(id);
    }
}
