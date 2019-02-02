package com.book.entity;

import lombok.Data;

@Data
public class Orderdetail {
    private Integer id;

    private String price;

    private String count;

    private Integer book_id;

    private Integer order_id;

}