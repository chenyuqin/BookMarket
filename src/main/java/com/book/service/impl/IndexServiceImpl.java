package com.book.service.impl;

import com.book.DTO.NewBookSaleDto;
import com.book.entity.Book;
import com.book.mapper.BookMapper;
import com.book.service.IndexService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IndexServiceImpl implements IndexService {

    @Autowired
    BookMapper bookMapper;

    @Override
    public List<NewBookSaleDto> getTenNewBook() {
        return bookMapper.getTenNewBook();
    }

    @Override
    public List<Book> getDiscountBook(Integer type) {
        return bookMapper.getDiscountBook(type);
    }

    @Override
    public List<Book> getSaleRankBook(Integer type) {
        return bookMapper.getSaleRankBook(type);
    }

    @Override
    public List<Book> getSaleRankBookAll() {
        return bookMapper.getSaleRankBookAll();
    }

    @Override
    public List<Book> getDiscountBookAll() {
        return bookMapper.getDiscountBookAll();
    }
}
