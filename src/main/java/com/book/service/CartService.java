package com.book.service;

import com.book.DTO.CartDto;
import com.book.entity.Cart;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface CartService {
    int deleteByPrimaryKey(Integer id);

    int insert(Cart record);

    int insertSelective(Cart record);

    Cart selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Cart record);

    int updateByPrimaryKey(Cart record);

    Cart selectByBookIdAndUserId(Integer book_id, Integer user_id);

    Integer selectCountByUserId(@Param("user_id") Integer user_id);

    List<CartDto> getCartsByUserID(@Param("user_id") Integer user_id);

    CartDto getCartByCartID(@Param("cart_id") Integer cart_id);
}
