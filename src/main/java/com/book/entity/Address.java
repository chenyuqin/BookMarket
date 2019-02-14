package com.book.entity;

import lombok.Data;

@Data
public class Address {
    private Integer id;

    private String name;

    private String phone;

    private String province;

    private String city;

    private String country;

    private String address;

    private String postcode;

    private Integer user_id;
}