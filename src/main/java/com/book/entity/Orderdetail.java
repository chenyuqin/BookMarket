package com.book.entity;

import lombok.Data;

@Data
public class Orderdetail {
    private Integer id;

    private String price;

    private Integer count;

    private Integer book_id;

    private String order_id;

}