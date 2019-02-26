package com.book.service.impl;

import com.book.DTO.EveryRemarkDto;
import com.book.DTO.SameCateBookDto;
import com.book.entity.Book;
import com.book.mapper.BookMapper;
import com.book.mapper.RemarkMapper;
import com.book.service.BookDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookDetailServiceImpl implements BookDetailService {

    @Autowired
    BookMapper bookMapper;

    @Autowired
    RemarkMapper remarkMapper;

    @Override
    public Book getBookById(Integer id) {
        return bookMapper.getBookById(id);
    }

    @Override
    public List<SameCateBookDto> getSameCateBook(String biggerCate, Integer id) {
        return bookMapper.getSameCateBook(biggerCate, id);
    }

    @Override
    public Integer getCountByBookId(Integer book_id) {
        return remarkMapper.getCountByBookId(book_id);
    }

    @Override
    public List<String> getAllStarByBookId(Integer book_id) {
        return remarkMapper.getAllStarByBookId(book_id);
    }

    @Override
    public Integer getCountByBookIdAndStarRange(Integer book_id, String slowStar, String highStar) {
        return remarkMapper.getCountByBookIdAndStarRange(book_id, slowStar, highStar);
    }

    @Override
    public List<EveryRemarkDto> getRemarkByBookIdAndStarRange(Integer book_id, String slowStar, String highStar) {
        return remarkMapper.getRemarkByBookIdAndStarRange(book_id, slowStar, highStar);
    }
}
