package com.book.service;

import com.book.DTO.EveryOrderDto;
import com.book.DTO.OrderBookDto;
import com.book.entity.Order;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface OrderService {
    int deleteByPrimaryKey(Integer id);

    int insert(Order record);

    int insertSelective(Order record);

    Order selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Order record);

    int updateByPrimaryKey(Order record);

    List<EveryOrderDto> getOrderByUserId(Integer userId, Integer status);

    List<OrderBookDto> getOrderBookByOrderId(@Param("order_id") String order_id);
}
