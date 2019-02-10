package com.book.service.impl;

import com.book.DTO.SearchByCateBookDto;
import com.book.VO.SearchByCateVO;
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
    public List<String> getSubCateByC1(SearchByCateVO searchByCateVO) {
        return bookMapper.getSubCateByC1(searchByCateVO);
    }

    @Override
    public List<String> getSubCateByC2(SearchByCateVO searchByCateVO) {
        return bookMapper.getSubCateByC2(searchByCateVO);
    }

    @Override
    public List<String> getPublishers(SearchByCateVO searchByCateVO) {
        return bookMapper.getPublishers(searchByCateVO);
    }

    @Override
    public List<String> getAuthors(SearchByCateVO searchByCateVO) {
        return bookMapper.getAuthors(searchByCateVO);
    }

    @Override
    public List<SearchByCateBookDto> searchByParam(SearchByCateVO searchByCateVO) {
        return bookMapper.searchByParam(searchByCateVO);
    }

    @Override
    public Integer getCountByParam(SearchByCateVO searchByCateVO) {
        return bookMapper.getCountByParam(searchByCateVO);
    }
}
