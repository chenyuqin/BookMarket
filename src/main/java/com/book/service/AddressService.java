package com.book.service;

import com.book.entity.Address;

import java.util.List;

public interface AddressService {
    int deleteByPrimaryKey(Integer id);

    int insert(Address record);

    int insertSelective(Address record);

    Address selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Address record);

    int updateByPrimaryKey(Address record);

    List<Address> selectAllByUserId(Integer user_id);
}
