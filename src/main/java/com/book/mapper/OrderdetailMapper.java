package com.book.mapper;

import com.book.entity.Orderdetail;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderdetailMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Orderdetail record);

    int insertSelective(Orderdetail record);

    Orderdetail selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Orderdetail record);

    int updateByPrimaryKey(Orderdetail record);

    void updateIsRemark(@Param("is_remark") Integer is_remark, @Param("order_id") String order_id);

    void updateIsRemarkByUserId(@Param("is_remark") Integer is_remark, @Param("user_id") Integer user_id, @Param("book_id") Integer book_id);
}