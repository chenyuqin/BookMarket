package com.book.service.impl;

import com.book.entity.Book;
import com.book.mapper.BookMapper;
import com.book.service.GuessYouLikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GuessYouLikeServiceImpl implements GuessYouLikeService {

    @Autowired
    BookMapper bookMapper;

    @Override
    public Book guessYouLike(Integer id) {
        return bookMapper.getBookById(id);
    }

    @Override
    public Integer getCount() {
        return bookMapper.getCount();
    }
}
