package com.book.mapper;

import com.book.DTO.NewBookSaleDto;
import com.book.DTO.SameCateBookDto;
import com.book.DTO.SearchByCateBookDto;
import com.book.VO.SearchByCateVO;
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

    List<String> getSubCateByC1(SearchByCateVO searchByCateVO);

    List<String> getSubCateByC2(SearchByCateVO searchByCateVO);

    List<String> getPublishers(SearchByCateVO searchByCateVO);

    List<String> getAuthors(SearchByCateVO searchByCateVO);

    List<SearchByCateBookDto> searchByParam(SearchByCateVO searchByCateVO);

    Integer getCountByParam(SearchByCateVO searchByCateVO);
}
