package com.book.entity;

import lombok.Data;

import java.util.Date;

@Data
public class Book {
    private Integer id;

    private String name;

    private String publishTime;

    private Integer category;

    private String biggestCate;

    private String biggerCate;

    private String bigCate;

    private String describe;

    private String author;

    private String publisher;

    private String star;

    private String price;

    private String prePrice;

    private String discount;

    private Integer stock;

    private Integer sales;

    private Integer remark;

    private String image1;

    private String image2;

    private String image3;

    private String image4;

    private String image5;

    private String paper;

    private String packing;

    private String suit;

    private String ISBN;

    private String detail;

    private String contentSummary;

    private String authorSummary;

    private String catalog;

    private Date groundingTime;
}