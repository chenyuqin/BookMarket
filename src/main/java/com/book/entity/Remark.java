package com.book.entity;

import lombok.Data;

import java.util.Date;

@Data
public class Remark {
    private Integer id;

    private String star;

    private Date remarkTime;

    private Integer user_id;

    private Integer book_id;

    private String remarkText;
}