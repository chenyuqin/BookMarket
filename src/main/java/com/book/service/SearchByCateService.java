package com.book.service;

import com.book.DTO.SearchByCateBookDto;

import java.util.List;

public interface SearchByCateService {
    List<SearchByCateBookDto> searchByCate(Integer category, String biggestCate, String biggerCate, String bigCate);

    List<String> getSubCateByC1(Integer category, String biggestCate);

    List<String> getSubCateByC2(Integer category, String biggestCate, String biggerCate);

    List<String> getPublishers(Integer category, String biggestCate, String biggerCate, String bigCate);
    List<String> getAuthors(Integer category, String biggestCate, String biggerCate, String bigCate);
    Integer getCountByCate(Integer category, String biggestCate, String biggerCate, String bigCate);
}
