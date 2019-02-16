package com.book.DTO;

import lombok.Data;

import java.util.List;

@Data
public class EveryOrderDto {

    private Integer status;

    private String createTime;

    private String name;

    private String order_id;

    private Integer pay_way;

    private String totalPrice;

    private List<OrderBookDto> orderBookDtos;
}
