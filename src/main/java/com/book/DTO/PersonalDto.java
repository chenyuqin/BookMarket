package com.book.DTO;

import com.book.entity.User;
import lombok.Data;

@Data
public class PersonalDto {
    private User user;

    private Integer unpaid;

    private Integer unreceive;

    private Integer unappraise;

    private Integer loveBook;
}
