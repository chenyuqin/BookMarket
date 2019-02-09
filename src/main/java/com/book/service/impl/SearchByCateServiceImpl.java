package com.book.service.impl;

import com.book.DTO.SearchByCateBookDto;
import com.book.mapper.BookMapper;
import com.book.service.SearchByCateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SearchByCateServiceImpl implements SearchByCateService {

    @Autowired
    BookMapper bookMapper;

    @Override
    public List<SearchByCateBookDto> searchByCate(Integer category, String biggestCate, String biggerCate, String bigCate) {
        return bookMapper.searchByCate(category, biggestCate, biggerCate, bigCate);
    }

    @Override
    public List<String> getSubCateByC1(Integer category, String biggestCate) {
        return bookMapper.getSubCateByC1(category, biggestCate);
    }

    @Override
    public List<String> getSubCateByC2(Integer category, String biggestCate, String biggerCate) {
        return bookMapper.getSubCateByC2(category, biggestCate, biggerCate);
    }

    @Override
    public List<String> getPublishers(Integer category, String biggestCate, String biggerCate, String bigCate) {
        return bookMapper.getPublishers(category, biggestCate, biggerCate, bigCate);
    }

    @Override
    public Integer getCountByCate(Integer category, String biggestCate, String biggerCate, String bigCate) {
        return bookMapper.getCountByCate(category, biggestCate, biggerCate, bigCate);
    }

    @Override
    public List<String> getAuthors(Integer category, String biggestCate, String biggerCate, String bigCate) {
        return bookMapper.getAuthors(category, biggestCate, biggerCate, bigCate);
    }
}
