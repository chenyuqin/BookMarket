package com.book.entity;

import lombok.Data;

@Data
public class User {
    private Integer id;

    private String name;

    private Integer sex;

    private String birthday;

    private String hobby;

    private String settle;

    private String email;

    private String password;

    private String activeCode;

    private Integer status;

    private String introdution;
}