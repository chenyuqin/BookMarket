package com.book.service.impl;

import com.book.entity.User;
import com.book.mapper.UserMapper;
import com.book.service.ChangePwdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChangePwdServiceImpl implements ChangePwdService {

    @Autowired
    UserMapper userMapper;

    @Override
    public User selectByPrimaryKeyAndPwd(Integer id, String password) {
        return userMapper.selectByPrimaryKeyAndPwd(id, password);
    }

    @Override
    public int updateByPrimaryKeySelective(User record) {
        return userMapper.updateByPrimaryKeySelective(record);
    }
}
