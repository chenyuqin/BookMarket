package com.book.entity;

import lombok.Data;

@Data
public class Cart {
    private Integer id;

    private Integer book_id;

    private Integer count;

    private Integer user_id;

}