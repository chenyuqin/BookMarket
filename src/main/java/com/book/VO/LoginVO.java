package com.book.VO;

import lombok.Data;

@Data
public class LoginVO {
    private String name_or_email;
    private String password;
    private String yzm;
    private Integer type;
}
