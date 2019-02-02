package com.book.service;

import org.apache.ibatis.annotations.Param;

import java.util.Map;

public interface LoginService {
    Map checkByNameAndPassword(@Param("name") String name, @Param("password") String password);
    Map checkByEmailAndPassword(@Param("email") String email, @Param("password") String password);
}
