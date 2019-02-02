package com.book.service.impl;

import com.book.mapper.UserMapper;
import com.book.service.ForgetPwdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ForgetPwdServiceImpl implements ForgetPwdService {

    @Autowired
    UserMapper userMapper;

    @Override
    public String findEmailByName(String name) {
        String email = userMapper.findEmailByName(name);
        return email;
    }

    @Override
    public Boolean checkUsername(String username) {
        Integer count = userMapper.checkUsername(username);
        if (count == 1) {
            return false;
        } else {
            return true;
        }
    }

    @Override
    public void updatePasswordByToken(String password, String activeCode) {
        userMapper.updatePasswordByToken(password, activeCode);
    }
}
