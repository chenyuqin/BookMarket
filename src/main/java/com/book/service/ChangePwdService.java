package com.book.service;

import com.book.entity.User;
import org.apache.ibatis.annotations.Param;

public interface ChangePwdService {
    User selectByPrimaryKeyAndPwd(Integer id, String password);

    int updateByPrimaryKeySelective(User record);
}
