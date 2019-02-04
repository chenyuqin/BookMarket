package com.book.service.impl;

import com.book.entity.Slideshow;
import com.book.mapper.SlideshowMapper;
import com.book.service.SlideshowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SlideshowServiceImpl implements SlideshowService {

    @Autowired
    SlideshowMapper slideshowMapper;

    @Override
    public List<Slideshow> selectNewFive() {
        return slideshowMapper.selectNewFive();
    }
}
