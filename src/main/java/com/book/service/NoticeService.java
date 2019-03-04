package com.book.service;

import com.book.entity.Notice;

import java.util.List;

public interface NoticeService {
    List<Notice> selectNew();

    Notice selectByPrimaryKey(Integer id);
}
