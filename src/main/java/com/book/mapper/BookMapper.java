package com.book.mapper;

import com.book.DTO.*;
import com.book.VO.RankVO;
import com.book.VO.SearchByCateVO;
import com.book.VO.SearchVO;
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

    //按分类搜索图书
    List<String> getSubCateByC1(SearchByCateVO searchByCateVO);

    List<String> getSubCateByC2(SearchByCateVO searchByCateVO);

    List<String> getPublishers(SearchByCateVO searchByCateVO);

    List<String> getAuthors(SearchByCateVO searchByCateVO);

    List<SearchByCateBookDto> searchByParam(SearchByCateVO searchByCateVO);

    Integer getCountByParam(SearchByCateVO searchByCateVO);

    //按关键字搜索匹配的id
    List<String> getIdsByQueryString(String queryString);

    List<SearchByCateBookDto> getBooksByQueryString(SearchVO searchVO);

    List<String> getCatesByQueryString(SearchVO searchVO);

    List<String> getPublishersByQueryString(SearchVO searchVO);

    List<String> getAuthorsByQueryString(SearchVO searchVO);

    Integer getCountByQueryString(SearchVO searchVO);

    //排行榜
    List<RankBookDto> getRankBooks(RankVO rankVO);

}
