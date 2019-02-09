package com.book.service;

import com.book.DTO.SameCateBookDto;
import com.book.entity.Book;

import java.util.List;

public interface BookDetailService {
    Book getBookById(Integer id);

    List<SameCateBookDto> getSameCateBook(String biggerCate, Integer id);
}
