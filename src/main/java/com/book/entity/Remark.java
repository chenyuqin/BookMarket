package com.book.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class Remark {
    private Integer id;

    private String star;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date remarkTime;

    private Integer user_id;

    private Integer book_id;

    private String remarkText;

    private Integer status;
}