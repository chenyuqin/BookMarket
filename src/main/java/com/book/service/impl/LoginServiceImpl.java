package com.book.service.impl;

import com.book.mapper.UserMapper;
import com.book.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    UserMapper userMapper;

    @Override
    public Map checkByNameAndPassword(String name, String password) {
        Map result = userMapper.checkByNameAndPassword(name, password);
        return result;
    }

    @Override
    public Map checkByEmailAndPassword(String email, String password) {
        Map result = userMapper.checkByEmailAndPassword(email, password);
        return result;
    }
}
