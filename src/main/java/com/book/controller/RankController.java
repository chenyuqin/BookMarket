package com.book.controller;

import com.book.DTO.RankBookDto;
import com.book.VO.RankVO;
import com.book.service.RankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("rank/")
public class RankController {

    @Autowired
    RankService rankService;

    @RequestMapping(value = "rank", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    @ResponseBody
    public Object getRankBooks(RankVO rankVO) {
        rankVO.setPage((rankVO.getPage() - 1) * 10);
        if (rankVO.getCategory() != null) {
            if (rankVO.getCategory() == 2 || rankVO.getCategory() == 5 || rankVO.getCategory() == 8) {
                if (rankVO.getType() != null && !rankVO.getType().equals("")) {
                    rankVO.setBiggerCate(rankVO.getType());
                }
            } else if (rankVO.getType() != null && !rankVO.getType().equals("")) {
                rankVO.setBiggestCate(rankVO.getType());
            } else {
                rankVO.setBiggestCate(null);
                rankVO.setBiggerCate(null);
            }
        }
        List<RankBookDto> rankBooks = rankService.getRankBooks(rankVO);
        for (RankBookDto rankBookDto : rankBooks) {
            String image1 = rankBookDto.getImage1().replace("_x_", "_b_");
            rankBookDto.setImage1(image1);
        }
        return rankBooks;
    }
}
