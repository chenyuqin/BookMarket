package com.book.service;

import com.book.DTO.SearchByCateBookDto;
import com.book.VO.SearchByCateVO;

import java.util.List;

public interface SearchByCateService {

    List<String> getSubCateByC1(SearchByCateVO searchByCateVO);

    List<String> getSubCateByC2(SearchByCateVO searchByCateVO);

    List<String> getPublishers(SearchByCateVO searchByCateVO);

    List<String> getAuthors(SearchByCateVO searchByCateVO);

    List<SearchByCateBookDto> searchByParam(SearchByCateVO searchByCateVO);

    Integer getCountByParam(SearchByCateVO searchByCateVO);
}
