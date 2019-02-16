package com.book.service;

import com.book.entity.Book;


public interface GuessYouLikeService {

    Book guessYouLike(Integer id);

    Integer getCount();
}
