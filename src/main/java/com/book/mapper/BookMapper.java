package com.book.mapper;

import com.book.entity.Book;
import org.springframework.stereotype.Repository;

@Repository
public interface BookMapper {
    Book getBookById(Integer id);

    Integer getCount();
}
