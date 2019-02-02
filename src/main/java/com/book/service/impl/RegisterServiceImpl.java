package com.book.service.impl;

import com.book.entity.User;
import com.book.mapper.UserMapper;
import com.book.service.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegisterServiceImpl implements RegisterService {

    @Autowired
    UserMapper userMapper;

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
    public Boolean checkEmail(String email) {
        Integer count = userMapper.checkEmail(email);
        if (count == 1) {
            return false;
        } else {
            return true;
        }
    }

    @Override
    public void saveUser(User user) {
        userMapper.saveUser(user);
    }

    @Override
    public Boolean active(String email, String activeCode) {
        Integer count = userMapper.checkByEmailAndCode(email, activeCode);
        if (count == 0) {
            return false;
        } else {
            userMapper.updateStatusTo1(email);
            return true;
        }
    }
}
