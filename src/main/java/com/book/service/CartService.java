package com.book.service;

import com.book.entity.Cart;

public interface CartService {
    int deleteByPrimaryKey(Integer id);

    int insert(Cart record);

    int insertSelective(Cart record);

    Cart selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Cart record);

    int updateByPrimaryKey(Cart record);

    Cart selectByBookIdAndUserId(Integer book_id, Integer user_id);
}
