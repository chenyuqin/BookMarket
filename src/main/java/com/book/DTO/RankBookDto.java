package com.book.DTO;

import lombok.Data;

@Data
public class RankBookDto {
    private Integer id;

    private String image1;

    private String name;

    private String star;

    private Integer remark;

    private String author;

    private String publishTime;

    private String publisher;

    private String price;

    private String prePrice;

    private String discount;

    private Integer sales;

    private Integer rankNo;
}
