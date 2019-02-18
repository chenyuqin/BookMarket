package com.book.service.impl;

import com.book.entity.Remark;
import com.book.mapper.RemarkMapper;
import com.book.service.RemarkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RemarkServiceImpl implements RemarkService {

    @Autowired
    RemarkMapper remarkMapper;

    @Override
    public int deleteByPrimaryKey(Integer id) {
        return remarkMapper.deleteByPrimaryKey(id);
    }

    @Override
    public int insert(Remark record) {
        return remarkMapper.insert(record);
    }

    @Override
    public int insertSelective(Remark record) {
        return remarkMapper.insertSelective(record);
    }

    @Override
    public Remark selectByPrimaryKey(Integer id) {
        return remarkMapper.selectByPrimaryKey(id);
    }

    @Override
    public int updateByPrimaryKeySelective(Remark record) {
        return remarkMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public int updateByPrimaryKeyWithBLOBs(Remark record) {
        return remarkMapper.updateByPrimaryKeyWithBLOBs(record);
    }

    @Override
    public int updateByPrimaryKey(Remark record) {
        return remarkMapper.updateByPrimaryKey(record);
    }

    @Override
    public Remark getByUserIdAndBookId(Integer user_id, Integer book_id) {
        return remarkMapper.getByUserIdAndBookId(user_id, book_id);
    }

    @Override
    public List<Integer> getBookIdByUserId(Integer user_id) {
        return remarkMapper.getBookIdByUserId(user_id);
    }
}
