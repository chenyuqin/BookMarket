package com.book.controller;

import com.book.DTO.DiscountBookDto;
import com.book.DTO.GuessYouLikeDto;
import com.book.DTO.NewBookSaleDto;
import com.book.DTO.SaleRankBookDto;
import com.book.entity.Book;
import com.book.entity.Notice;
import com.book.entity.Slideshow;
import com.book.service.*;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("index/")
public class IndexController {

    @Autowired
    SlideshowService slideshowService;

    @Autowired
    NoticeService noticeService;

    @Autowired
    GuessYouLikeService guessYouLikeService;

    @Autowired
    IndexService indexService;

    @Autowired
    CategoryService categoryService;

    //轮播图
    @RequestMapping(value = "slideshow", method = RequestMethod.GET)
    @ResponseBody
    public Object slideshow() {
        List<Slideshow> slideshows = slideshowService.selectNewFive();
        return slideshows;
    }

    //最新动态
    @RequestMapping(value = "notice", method = RequestMethod.GET)
    @ResponseBody
    public Object notice() {
        List<Notice> notices = noticeService.selectNew();
        return notices;
    }

    //猜你喜欢
    @RequestMapping(value = "guessYouLike", method = RequestMethod.GET)
    @ResponseBody
    public Object guessYouLike() {
        int randomId = 1+(int)(Math.random() * (guessYouLikeService.getCount()));
        Book book = guessYouLikeService.guessYouLike(randomId);
        GuessYouLikeDto guessYouLikeDto = new GuessYouLikeDto();
        BeanUtils.copyProperties(book, guessYouLikeDto);
        String image1 = guessYouLikeDto.getImage1().replace("_x_", "_b_");
        guessYouLikeDto.setImage1(image1);
        return guessYouLikeDto;
    }

    //新书上架
    @RequestMapping(value = "getTenNewBook", method = RequestMethod.GET)
    @ResponseBody
    public Object book_new() {
        List<NewBookSaleDto> tenNewBook = indexService.getTenNewBook();
        for (NewBookSaleDto newBookSaleDto : tenNewBook) {
            String image1 = newBookSaleDto.getImage1().replace("_x_", "_b_");
            newBookSaleDto.setImage1(image1);
        }
        return tenNewBook;
    }

    @RequestMapping(value = "getDiscountBook", method = RequestMethod.GET)
    @ResponseBody
    public Object book_discount(@RequestParam("type") Integer type) {
        List<Book> discountBook = null;
        if (type == 0) {
            discountBook = indexService.getDiscountBookAll();
        } else {
            discountBook = indexService.getDiscountBook(type);
        }
        List<DiscountBookDto> discountBookDtos = new ArrayList<>();
        for (Book book : discountBook) {
            DiscountBookDto discountBookDto = new DiscountBookDto();
            BeanUtils.copyProperties(book, discountBookDto);
            String image1 = discountBookDto.getImage1().replace("_x_", "_b_");
            discountBookDto.setImage1(image1);
            discountBookDto.setCategory(categoryService.selectByPrimaryKey(book.getCategory()).getCateName());
            discountBookDtos.add(discountBookDto);
        }
        return discountBookDtos;
    }

    //销量排行榜
    @RequestMapping(value = "getSaleRankBook", method = RequestMethod.GET)
    @ResponseBody
    public Object book_sale_rank(@RequestParam("type") Integer type) {
        List<Book> saleRankBook = null;
        if (type == 0) {
            saleRankBook = indexService.getSaleRankBookAll();
        } else {
            saleRankBook = indexService.getSaleRankBook(type);
        }
        List<SaleRankBookDto> saleRankBookDtos = new ArrayList<>();
        for (Book book : saleRankBook) {
            SaleRankBookDto saleRankBookDto = new SaleRankBookDto();
            BeanUtils.copyProperties(book, saleRankBookDto);
            String image1 = saleRankBookDto.getImage1().replace("_x_", "_b_");
            saleRankBookDto.setImage1(image1);
            saleRankBookDto.setCategory(categoryService.selectByPrimaryKey(book.getCategory()).getCateName());
            saleRankBookDtos.add(saleRankBookDto);
        }
        return saleRankBookDtos;
    }
}
