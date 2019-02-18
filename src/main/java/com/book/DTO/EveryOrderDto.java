package com.book.DTO;

import com.book.entity.Address;
import lombok.Data;

import java.util.List;

@Data
public class EveryOrderDto {

    private Integer status;

    private String createTime;

    private Integer address_id;

    private Address address;

    private String order_id;

    private Integer pay_way;

    private String totalPrice;

    private List<OrderBookDto> orderBookDtos;
}
