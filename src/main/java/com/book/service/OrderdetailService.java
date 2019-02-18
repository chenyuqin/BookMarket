package com.book.service;

import com.book.entity.Orderdetail;
import org.apache.ibatis.annotations.Param;

public interface OrderdetailService {
    int deleteByPrimaryKey(Integer id);

    int insert(Orderdetail record);

    int insertSelective(Orderdetail record);

    Orderdetail selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Orderdetail record);

    int updateByPrimaryKey(Orderdetail record);

    void updateIsRemark(Integer is_remark, String order_id);

    void updateIsRemarkByUserId(Integer is_remark, Integer user_id, Integer book_id);
}
