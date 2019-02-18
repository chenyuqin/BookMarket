package com.book.mapper;

import com.book.entity.Remark;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RemarkMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Remark record);

    int insertSelective(Remark record);

    Remark selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Remark record);

    int updateByPrimaryKeyWithBLOBs(Remark record);

    int updateByPrimaryKey(Remark record);

    Remark getByUserIdAndBookId(@Param("user_id") Integer user_id, @Param("book_id") Integer book_id);

    List<Integer> getBookIdByUserId(@Param("user_id") Integer user_id);


}