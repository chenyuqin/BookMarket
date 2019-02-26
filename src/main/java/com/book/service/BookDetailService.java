package com.book.service;

import com.book.DTO.EveryRemarkDto;
import com.book.DTO.SameCateBookDto;
import com.book.entity.Book;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface BookDetailService {
    Book getBookById(Integer id);

    List<SameCateBookDto> getSameCateBook(String biggerCate, Integer id);

    Integer getCountByBookId(Integer book_id);

    List<String> getAllStarByBookId(Integer book_id);

    Integer getCountByBookIdAndStarRange(Integer book_id, String slowStar, String highStar);

    List<EveryRemarkDto> getRemarkByBookIdAndStarRange(Integer book_id, String slowStar, String highStar);
}
