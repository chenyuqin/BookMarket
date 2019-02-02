package com.book.entity;

import lombok.Data;

import java.util.Date;

@Data
public class Order {
    private Integer id;

    private String totalPrice;

    private Integer status;

    private Date createTime;

    private Integer user_id;

    private Integer address_id;

}