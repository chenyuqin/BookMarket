package com.book.service;

import com.book.DTO.NewBookSaleDto;
import com.book.entity.Book;

import java.util.List;

public interface IndexService {

    List<NewBookSaleDto> getTenNewBook();

    List<Book> getDiscountBook(Integer type);

    List<Book> getDiscountBookAll();

    List<Book> getSaleRankBook(Integer type);

    List<Book> getSaleRankBookAll();
}
