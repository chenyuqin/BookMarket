package com.book.service.impl;

import com.book.entity.Orderdetail;
import com.book.mapper.OrderdetailMapper;
import com.book.service.OrderdetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderdetailServiceImpl implements OrderdetailService {

    @Autowired
    OrderdetailMapper orderdetailMapper;

    @Override
    public int deleteByPrimaryKey(Integer id) {
        return orderdetailMapper.deleteByPrimaryKey(id);
    }

    @Override
    public int insert(Orderdetail record) {
        return orderdetailMapper.insert(record);
    }

    @Override
    public int insertSelective(Orderdetail record) {
        return orderdetailMapper.insertSelective(record);
    }

    @Override
    public Orderdetail selectByPrimaryKey(Integer id) {
        return orderdetailMapper.selectByPrimaryKey(id);
    }

    @Override
    public int updateByPrimaryKeySelective(Orderdetail record) {
        return orderdetailMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public int updateByPrimaryKey(Orderdetail record) {
        return orderdetailMapper.updateByPrimaryKey(record);
    }

    @Override
    public void updateIsRemark(Integer is_remark, String order_id) {
        orderdetailMapper.updateIsRemark(is_remark, order_id);
    }

    @Override
    public void updateIsRemarkByUserId(Integer is_remark, Integer user_id, Integer book_id) {
        orderdetailMapper.updateIsRemarkByUserId(is_remark, user_id, book_id);
    }
}
