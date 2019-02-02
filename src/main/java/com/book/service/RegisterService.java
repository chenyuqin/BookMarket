package com.book.service;

import com.book.entity.User;

public interface RegisterService {
    Boolean checkUsername(String username);

    Boolean checkEmail(String email);

    void saveUser(User user);

    Boolean active(String email, String activeCode);
}
