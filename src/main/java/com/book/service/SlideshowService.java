package com.book.service;

import com.book.entity.Slideshow;

import java.util.List;

public interface SlideshowService {
    List<Slideshow> selectNewFive();
}
