package com.book.service;

import com.book.DTO.SearchByCateBookDto;
import com.book.VO.SearchVO;

import java.util.List;

public interface SearchService {
    List<String> getIdsByQueryString(String queryString);

    List<SearchByCateBookDto> getBooksByQueryString(SearchVO searchVO);

    List<String> getCatesByQueryString(SearchVO searchVO);

    List<String> getPublishersByQueryString(SearchVO searchVO);

    List<String> getAuthorsByQueryString(SearchVO searchVO);

    Integer getCountByQueryString(SearchVO searchVO);
}
