package com.book.controller;

import com.book.DTO.BookDetailDto;
import com.book.DTO.SameCateBookDto;
import com.book.entity.Book;
import com.book.mapper.BookMapper;
import com.book.service.BookDetailService;
import com.book.service.CategoryService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("bookDetail/")
public class BookDetailController {

    @Autowired
    BookDetailService bookDetailService;

    @Autowired
    CategoryService categoryService;

    @RequestMapping(value = "getBookById", method = RequestMethod.GET)
    @ResponseBody
    public Object getBookById(@RequestParam("id") Integer id) {
        Book book = bookDetailService.getBookById(id);
        BookDetailDto bookDetailDto = new BookDetailDto();
        BeanUtils.copyProperties(book, bookDetailDto);
        bookDetailDto.setCategory(categoryService.selectByPrimaryKey(book.getCategory()).getCateName());
        String image1 = bookDetailDto.getImage1().replace("_x_", "_w_");
        bookDetailDto.setImage1(image1);
        if (!bookDetailDto.getImage2().equals("")) {
            String image2 = bookDetailDto.getImage2().replace("_x_", "_w_");
            bookDetailDto.setImage2(image2);
        }
        if (!bookDetailDto.getImage3().equals("")) {
            String image3 = bookDetailDto.getImage3().replace("_x_", "_w_");
            bookDetailDto.setImage3(image3);
        }
        if (!bookDetailDto.getImage4().equals("")) {
            String image4 = bookDetailDto.getImage4().replace("_x_", "_w_");
            bookDetailDto.setImage4(image4);
        }
        if (!bookDetailDto.getImage5().equals("")) {
            String image5 = bookDetailDto.getImage5().replace("_x_", "_w_");
            bookDetailDto.setImage5(image5);
        }

        List<SameCateBookDto> sameCateBooks = bookDetailService.getSameCateBook(bookDetailDto.getBiggerCate(), id);
        for (SameCateBookDto sameCateBookDto : sameCateBooks) {
            image1 = sameCateBookDto.getImage1().replace("_x_", "_w_");
            sameCateBookDto.setImage1(image1);
        }
        bookDetailDto.setSameCateBooks(sameCateBooks);
        return bookDetailDto;
    }
}
