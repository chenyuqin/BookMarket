package com.book.service;

import com.book.entity.Remark;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface RemarkService {
    int deleteByPrimaryKey(Integer id);

    int insert(Remark record);

    int insertSelective(Remark record);

    Remark selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Remark record);

    int updateByPrimaryKeyWithBLOBs(Remark record);

    int updateByPrimaryKey(Remark record);

    Remark getByUserIdAndBookId(Integer user_id, Integer book_id);

    List<Integer> getBookIdByUserId(Integer user_id);
}