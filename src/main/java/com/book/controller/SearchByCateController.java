package com.book.controller;

import com.book.DTO.SearchByCateBookDto;
import com.book.DTO.SearchByCateDto;
import com.book.VO.SearchByCateVO;
import com.book.service.SearchByCateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.*;

@Controller
@RequestMapping("searchByCate/")
public class SearchByCateController {

    @Autowired
    SearchByCateService searchByCateService;

    @RequestMapping(value = "searchByParam", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    @ResponseBody
    public Object searchByParam(SearchByCateVO searchByCateVO) {
        //分类
        List<String> subCates = null;
        if (searchByCateVO.getBiggerCate() == null) {
            subCates = searchByCateService.getSubCateByC1(searchByCateVO);
        } else if (searchByCateVO.getBigCate() == null) {
            subCates = searchByCateService.getSubCateByC2(searchByCateVO);
        }
        if (subCates != null) {
            if (subCates.size() == 1 && subCates.get(0) == null) {
                subCates = null;
            } else {
                if (subCates.contains("")) {
                    subCates.remove("");
                    subCates.add("更多");
                } else if (subCates.contains(null)) {
                    subCates.remove(null);
                    subCates.add("更多");
                } else if (subCates.contains("null")) {
                    subCates.remove("null");
                    subCates.add("更多");
                }
            }
        }

        //出版社
        List<String> publishers = null;
        publishers = searchByCateService.getPublishers(searchByCateVO);

        //作者
        List<String> authors = null;
        authors = searchByCateService.getAuthors(searchByCateVO);
        String[] countryWord = {"（美）", "[美]", "(美)","【美】", "（韩）", "[韩]", "(韩)","【韩】",
                "（日）", "[日]", "(日)", "【日】", "（英）", "[英]", "(英)","【英】", "（丹）", "[丹]", "(丹)", "【丹】", "（法）", "[法]", "(法)", "【法】","（俄）", "[俄]", "(俄)", "【俄】","（新西兰）", "[新西兰]", "(新西兰)", "【新西兰】","（法国）", "[法国]", "(法国)", "【法国】", "（意）", "[意]", "(意)", "【意】","（德）", "[德]", "(德)", "【德】","（奥）", "[奥]", "(奥)", "【奥】","（美国）", "[美国]", "(美国)", "【美国】","（澳）", "[澳]", "(澳)", "【澳】","（智）", "[智]", "(智)", "【智】","（苏）", "[苏]", "(苏)", "【苏】","（奥地利）", "[奥地利]", "(奥地利)", "【奥地利】","（俄罗斯）", "[俄罗斯]", "(俄罗斯)", "【俄罗斯】","（印度）", "[印度]", "(印度)", "【印度】","（哥伦比亚）", "[哥伦比亚]", "(哥伦比亚)", "【哥伦比亚】"};
        List<String> authorsExceptWord = new ArrayList<>();
        for (String author : authors) {
            for (String word : countryWord) {
                if (author.contains(word)) {
                    String replace = author.replace(word, "");
                    author = replace;
                }
            }
            authorsExceptWord.add(author);
        }
        Set<String> authorsSet = new HashSet<>();
        for (String author : authorsExceptWord) {
            if (author.contains(" 著")) {
                author = author.split(" 著")[0];
            } else if (author.contains(" 编")) {
                author = author.split(" 编")[0];
            } else if (author.contains(" 等")) {
                author = author.split(" 等")[0];
            } else if (author.contains(" 主编")) {
                author = author.split(" 主编")[0];
            } else if (author.contains("等")) {
                author = author.split("等")[0];
            } else if (author.contains("著")) {
                author = author.split("著")[0];
            }
            authorsSet.add(author);
        }
        Set<String> autSet = new HashSet<>();
        for (String aut : authorsSet) {
            if (!aut.contains(" ")) {
                if (!aut.contains("S") && !aut.contains("C")) {
                    if (aut.contains("、")) {
                        String[] strings = aut.split("、");
                        Arrays.stream(strings).forEach(s -> autSet.add(s));
                    } else if (aut.contains("，")) {
                        String[] strings = aut.split("，");
                        Arrays.stream(strings).forEach(s -> autSet.add(s));
                    } else if (aut.contains(",")) {
                        String[] strings = aut.split(",");
                        Arrays.stream(strings).forEach(s -> autSet.add(s));
                    } else {
                        autSet.add(aut);
                    }
                } else {
                    autSet.add(aut);
                }
            }
        }

        //图书总数
        Integer count = searchByCateService.getCountByParam(searchByCateVO);

        //总页数
        Integer pages = (int)Math.ceil(count*1.0 / 15);

        //匹配的图书
        searchByCateVO.setPage((searchByCateVO.getPage()-1) * 15);
        List<SearchByCateBookDto> searchByCateBookDtos = searchByCateService.searchByParam(searchByCateVO);
        for (SearchByCateBookDto searchByCateBookDto : searchByCateBookDtos) {
            String image1 = searchByCateBookDto.getImage1().replace("_x_", "_b_");
            searchByCateBookDto.setImage1(image1);
        }

        SearchByCateDto searchByCateDto = new SearchByCateDto();
        searchByCateDto.setBooks(searchByCateBookDtos);
        searchByCateDto.setAuthors(new ArrayList<>(autSet));
        searchByCateDto.setPublishers(publishers);
        searchByCateDto.setCates(subCates);
        searchByCateDto.setCount(count);
        searchByCateDto.setPages(pages);
        return searchByCateDto;
    }
}
