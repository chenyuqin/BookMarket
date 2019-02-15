package com.book.DTO;

import lombok.Data;

@Data
public class CartDto {
    private Integer book_id;

    private Integer cart_id;

    private String image1;

    private String name;

    private String author;

    private String price;

    private Integer count;

}
