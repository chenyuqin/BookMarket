package com.book.controller;

import com.book.DTO.AppraiseBookDto;
import com.book.common.JwtUtils;
import com.book.entity.Book;
import com.book.entity.Orderdetail;
import com.book.entity.Remark;
import com.book.service.BookDetailService;
import com.book.service.OrderService;
import com.book.service.OrderdetailService;
import com.book.service.RemarkService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("appraise/")
public class AppraiseController {

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    OrderService orderService;

    @Autowired
    RemarkService remarkService;

    @Autowired
    OrderdetailService orderdetailService;

    @Autowired
    BookDetailService bookDetailService;

    @RequestMapping(value = "getNotApprBooks", method = RequestMethod.POST)
    @ResponseBody
    public Object getNotApprBooks(@RequestParam("token") String token) {
        Claims claims = jwtUtils.parseJWT(token);
        Integer userID = (Integer) claims.get("userID");

        List<Integer> notApprBooksByUserID = orderService.getNotApprBooksByUserID(userID);
        List<AppraiseBookDto> appraiseBookDtos = new ArrayList<>();
        for (Integer book_id : notApprBooksByUserID) {
            Remark remark = remarkService.getByUserIdAndBookId(userID, book_id);
            if (remark != null) {
                orderdetailService.updateIsRemarkByUserId(1, userID, book_id);
            } else {
                Book bookById = bookDetailService.getBookById(book_id);
                AppraiseBookDto appraiseBookDto = new AppraiseBookDto();
                BeanUtils.copyProperties(bookById, appraiseBookDto);
                appraiseBookDto.setImage1(appraiseBookDto.getImage1().replace("_x_", "_b_"));
                appraiseBookDtos.add(appraiseBookDto);
            }
        }
        return appraiseBookDtos;
    }

    @RequestMapping(value = "getApprBooks", method = RequestMethod.POST)
    @ResponseBody
    public Object getApprBooks(@RequestParam("token") String token) {
        Claims claims = jwtUtils.parseJWT(token);
        Integer userID = (Integer) claims.get("userID");

        List<Integer> bookIds = remarkService.getBookIdByUserId(userID);
        List<AppraiseBookDto> appraiseBookDtos = new ArrayList<>();
        for (Integer book_id : bookIds) {
            Book bookById = bookDetailService.getBookById(book_id);
            AppraiseBookDto appraiseBookDto = new AppraiseBookDto();
            BeanUtils.copyProperties(bookById, appraiseBookDto);
            appraiseBookDto.setImage1(appraiseBookDto.getImage1().replace("_x_", "_b_"));
            appraiseBookDtos.add(appraiseBookDto);
        }
        return appraiseBookDtos;
    }

    @RequestMapping(value = "insertRemark", method = RequestMethod.POST)
    @ResponseBody
    public Object insertRemark(@RequestParam("token") String token, Remark remark) {
        Claims claims = jwtUtils.parseJWT(token);
        Integer userID = (Integer) claims.get("userID");

        remark.setUser_id(userID);
        remarkService.insertSelective(remark);
        return true;
    }

    @RequestMapping(value = "getRemarkByBookId", method = RequestMethod.POST)
    @ResponseBody
    public Object getRemarkByBookId(@RequestParam("token") String token, @RequestParam("book_id") Integer book_id) {
        Claims claims = jwtUtils.parseJWT(token);
        Integer userID = (Integer) claims.get("userID");

        Remark remark = remarkService.getByUserIdAndBookId(userID, book_id);
        return remark;
    }
}
