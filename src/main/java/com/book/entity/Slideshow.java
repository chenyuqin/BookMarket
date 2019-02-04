package com.book.entity;

import lombok.Data;

import java.util.Date;

@Data
public class Slideshow {
    private Integer id;

    private String img;

    private String url;

    private Date time;
}