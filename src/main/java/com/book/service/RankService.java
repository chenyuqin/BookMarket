package com.book.service;

import com.book.DTO.RankBookDto;
import com.book.VO.RankVO;

import java.util.List;

public interface RankService {
    //排行榜
    List<RankBookDto> getRankBooks(RankVO rankVO);
}
