package com.book.controller;

import com.book.entity.Book;
import com.book.entity.Notice;
import com.book.entity.Slideshow;
import com.book.service.GuessYouLikeService;
import com.book.service.NoticeService;
import com.book.service.SlideshowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

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
        
    }
}
