package com.book.entity;

import lombok.Data;

@Data
public class Cart {
    private Integer id;

    private Integer book_id;

    private String count;

    private String price;

    private Integer user_id;

}