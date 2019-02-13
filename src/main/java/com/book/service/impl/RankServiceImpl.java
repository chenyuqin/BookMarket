package com.book.service.impl;

import com.book.DTO.RankBookDto;
import com.book.VO.RankVO;
import com.book.mapper.BookMapper;
import com.book.service.RankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RankServiceImpl implements RankService {

    @Autowired
    BookMapper bookMapper;
    @Override
    public List<RankBookDto> getRankBooks(RankVO rankVO) {
        return bookMapper.getRankBooks(rankVO);
    }
}
