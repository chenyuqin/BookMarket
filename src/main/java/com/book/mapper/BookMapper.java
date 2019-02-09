package com.book.mapper;

import com.book.DTO.NewBookSaleDto;
import com.book.DTO.SameCateBookDto;
import com.book.DTO.SearchByCateBookDto;
import com.book.entity.Book;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Repository
public interface BookMapper {
    Book getBookById(Integer id);

    Integer getCount();

    List<NewBookSaleDto> getTenNewBook();

    List<Book> getDiscountBook(Integer type);

    List<Book> getDiscountBookAll();

    List<Book> getSaleRankBook(Integer type);

    List<Book> getSaleRankBookAll();

    List<SameCateBookDto> getSameCateBook(@Param("biggerCate") String biggerCate, @Param("id") Integer id);

    List<SearchByCateBookDto> searchByCate(@Param("category") Integer category,
                                           @Param("biggestCate") String biggestCate,
                                           @Param("biggerCate") String biggerCate,
                                           @Param("bigCate") String bigCate);

    List<String> getSubCateByC1(@Param("category") Integer category,
                                @Param("biggestCate") String biggestCate);

    List<String> getSubCateByC2(@Param("category") Integer category,
                                @Param("biggestCate") String biggestCate,
                                @Param("biggerCate") String biggerCate);

    List<String> getPublishers(@Param("category") Integer category,
                               @Param("biggestCate") String biggestCate,
                               @Param("biggerCate") String biggerCate,
                               @Param("bigCate") String bigCate);

    List<String> getAuthors(@Param("category") Integer category,
                            @Param("biggestCate") String biggestCate,
                            @Param("biggerCate") String biggerCate,
                            @Param("bigCate") String bigCate);

    Integer getCountByCate(@Param("category") Integer category,
                            @Param("biggestCate") String biggestCate,
                            @Param("biggerCate") String biggerCate,
                            @Param("bigCate") String bigCate);
}
