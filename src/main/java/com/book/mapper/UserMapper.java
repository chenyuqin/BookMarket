package com.book.mapper;

import com.book.entity.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public interface UserMapper {

    //注册、激活
    Integer checkUsername(String username);
    Integer checkEmail(String email);
    void saveUser(User user);
    Integer checkByEmailAndCode(@Param("email") String email, @Param("activeCode") String activeCode);
    void updateStatusTo1(@Param("email") String email);

    //登录
    Map checkByNameAndPassword(@Param("name") String name, @Param("password") String password);
    Map checkByEmailAndPassword(@Param("email") String email, @Param("password") String password);

    //忘记密码
    String findEmailByName(@Param("name")String name);
    void updatePasswordByToken(@Param("password") String password, @Param("activeCode") String activeCode);

    //个人信息
    User selectByPrimaryKey(Integer id);
}
