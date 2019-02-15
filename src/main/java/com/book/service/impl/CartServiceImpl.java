package com.book.service.impl;

import com.book.DTO.CartDto;
import com.book.entity.Cart;
import com.book.mapper.CartMapper;
import com.book.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    CartMapper cartMapper;

    @Override
    public int deleteByPrimaryKey(Integer id) {
        return cartMapper.deleteByPrimaryKey(id);
    }

    @Override
    public int insert(Cart record) {
        return cartMapper.insert(record);
    }

    @Override
    public int insertSelective(Cart record) {
        return cartMapper.insertSelective(record);
    }

    @Override
    public Cart selectByPrimaryKey(Integer id) {
        return cartMapper.selectByPrimaryKey(id);
    }

    @Override
    public int updateByPrimaryKeySelective(Cart record) {
        return cartMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public int updateByPrimaryKey(Cart record) {
        return cartMapper.updateByPrimaryKey(record);
    }

    @Override
    public Cart selectByBookIdAndUserId(Integer book_id, Integer user_id) {
        return cartMapper.selectByBookIdAndUserId(book_id, user_id);
    }

    @Override
    public Integer selectCountByUserId(Integer user_id) {
        return cartMapper.selectCountByUserId(user_id);
    }

    @Override
    public List<CartDto> getCartsByUserID(Integer user_id) {
        return cartMapper.getCartsByUserID(user_id);
    }

    @Override
    public CartDto getCartByCartID(Integer cart_id) {
        return cartMapper.getCartByCartID(cart_id);
    }

}
