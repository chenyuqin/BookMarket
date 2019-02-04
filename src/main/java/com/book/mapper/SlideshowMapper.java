package com.book.mapper;

import com.book.entity.Slideshow;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SlideshowMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Slideshow record);

    int insertSelective(Slideshow record);

    Slideshow selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Slideshow record);

    int updateByPrimaryKey(Slideshow record);

    List<Slideshow> selectNewFive();
}