package com.book.DTO;

import com.book.entity.Address;
import lombok.Data;

import java.util.List;

@Data
public class ReOrderDto {

    private List<CartDto> cartDtos;

    private List<Address> addresses;

    private String totalPrice;
}
