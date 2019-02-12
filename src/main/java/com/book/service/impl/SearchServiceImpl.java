package com.book.service.impl;

import com.book.DTO.SearchByCateBookDto;
import com.book.VO.SearchVO;
import com.book.mapper.BookMapper;
import com.book.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SearchServiceImpl implements SearchService {

    @Autowired
    BookMapper bookMapper;

    @Override
    public List<String> getIdsByQueryString(String queryString) {
        return bookMapper.getIdsByQueryString(queryString);
    }

    @Override
    public List<SearchByCateBookDto> getBooksByQueryString(SearchVO searchVO) {
        return bookMapper.getBooksByQueryString(searchVO);
    }

    @Override
    public List<String> getCatesByQueryString(SearchVO searchVO) {
        return bookMapper.getCatesByQueryString(searchVO);
    }

    @Override
    public List<String> getPublishersByQueryString(SearchVO searchVO) {
        return bookMapper.getPublishersByQueryString(searchVO);
    }

    @Override
    public List<String> getAuthorsByQueryString(SearchVO searchVO) {
        return bookMapper.getAuthorsByQueryString(searchVO);
    }

    @Override
    public Integer getCountByQueryString(SearchVO searchVO) {
        return bookMapper.getCountByQueryString(searchVO);
    }
}
