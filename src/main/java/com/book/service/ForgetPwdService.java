package com.book.service;

import org.apache.ibatis.annotations.Param;

public interface ForgetPwdService {
    String findEmailByName(String name);
    Boolean checkUsername(String username);
    void updatePasswordByToken(@Param("password") String password, @Param("activeCode") String activeCode);
}
