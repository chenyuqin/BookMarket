package com.book.service;

import com.book.entity.User;

public interface PersonalService {
    User selectByPrimaryKey(Integer id);
}
