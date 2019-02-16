package com.book.service.impl;

import com.book.DTO.EveryOrderDto;
import com.book.DTO.OrderBookDto;
import com.book.entity.Order;
import com.book.mapper.OrderMapper;
import com.book.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    OrderMapper orderMapper;

    @Override
    public int deleteByPrimaryKey(Integer id) {
        return orderMapper.deleteByPrimaryKey(id);
    }

    @Override
    public int insert(Order record) {
        return orderMapper.insert(record);
    }

    @Override
    public int insertSelective(Order record) {
        return orderMapper.insertSelective(record);
    }

    @Override
    public Order selectByPrimaryKey(Integer id) {
        return orderMapper.selectByPrimaryKey(id);
    }

    @Override
    public int updateByPrimaryKeySelective(Order record) {
        return orderMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public int updateByPrimaryKey(Order record) {
        return orderMapper.updateByPrimaryKey(record);
    }

    @Override
    public List<EveryOrderDto> getOrderByUserId(Integer userId, Integer status) {
        return orderMapper.getOrderByUserId(userId, status);
    }

    @Override
    public List<OrderBookDto> getOrderBookByOrderId(String order_id) {
        return orderMapper.getOrderBookByOrderId(order_id);
    }

}
