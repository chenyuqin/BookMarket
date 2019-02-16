package com.book.DTO;

import lombok.Data;

@Data
public class OrderBookDto {
    private Integer id;

    private String name;

    private String author;

    private String image1;

    private String price;

    private Integer count;
}
