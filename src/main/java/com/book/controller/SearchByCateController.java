package com.book.controller;

import com.book.DTO.SearchByCateBookDto;
import com.book.DTO.SearchByCateDto;
import com.book.service.SearchByCateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.*;

@Controller
@RequestMapping("searchByCate/")
public class SearchByCateController {

    @Autowired
    SearchByCateService searchByCateService;

    @RequestMapping(value = "search", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    @ResponseBody
    public Object search(@RequestParam("category") Integer category,
                         @RequestParam("c1") String c1,
                         @RequestParam("c2") String c2,
                         @RequestParam("c3") String c3) {

        //获取15本跟分类相关的图书信息
        SearchByCateDto searchByCateDto = new SearchByCateDto();
        List<SearchByCateBookDto> searchByCateBookDtos = searchByCateService.searchByCate(category, c1, c2, c3);

        //分类
        List<String> subCates = null;
        if (c2.equals("null")) {
            subCates = searchByCateService.getSubCateByC1(category, c1);
        } else if(c3.equals("null")) {
            subCates = searchByCateService.getSubCateByC2(category, c1, c2);
        }

        //出版社(sql语句限定了取出40条)
        List<String> publishers = null;
        publishers = searchByCateService.getPublishers(category, c1, c2, c3);

        //作者(sql语句限定了取出40条)
        List<String> authors = null;
        authors = searchByCateService.getAuthors(category, c1, c2, c3);
        Set<String> authorsSet = new HashSet<>();
        for (String author : authors) {
            if (author.contains(" 著")) {
                author = author.split(" 著")[0];
            }
            if (author.contains("著")) {
                author = author.split("著")[0];
            }
            if (author.contains(" 主编")) {
                author = author.split(" 主编")[0];
            }
            if (author.contains(" 编")) {
                author = author.split(" 编")[0];
            }
            if (author.contains(" 等编")) {
                author = author.split(" 等编")[0];
            }
            authorsSet.add(author);
        }

        //查出来的图书总数
        Integer count = searchByCateService.getCountByCate(category, c1, c2, c3);

        searchByCateDto.setBooks(searchByCateBookDtos);
        searchByCateDto.setCates(subCates);
        searchByCateDto.setPublishers(publishers);
        searchByCateDto.setAuthors(new ArrayList<>(authorsSet));
        searchByCateDto.setCount(count);
        return searchByCateDto;
    }
}
