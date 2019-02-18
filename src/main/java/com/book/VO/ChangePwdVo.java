package com.book.VO;

import lombok.Data;

@Data
public class ChangePwdVo {

    private String old_pwd;
    private String new_pwd;
    private String re_new_pwd;
    private String code;
}
