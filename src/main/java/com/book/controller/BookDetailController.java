package com.book.controller;

import com.book.DTO.*;
import com.book.common.JsonResult;
import com.book.common.JwtUtils;
import com.book.entity.Book;
import com.book.entity.Remark;
import com.book.mapper.BookMapper;
import com.book.service.BookDetailService;
import com.book.service.CategoryService;
import com.book.service.RemarkService;
import io.jsonwebtoken.Claims;
import net.sf.json.JSON;
import net.sf.json.JSONSerializer;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
@RequestMapping("bookDetail/")
public class BookDetailController {

    @Autowired
    BookDetailService bookDetailService;

    @Autowired
    CategoryService categoryService;

    private JSON json;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    RemarkService remarkService;

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

    @RequestMapping(value = "getRemark", method = RequestMethod.GET)
    @ResponseBody
    public Object getRemark(@RequestParam("id") Integer id) {

        Integer totalCount = bookDetailService.getCountByBookId(id);
        String favorableRate = null;
        if (totalCount != 0) {
            List<String> stars = bookDetailService.getAllStarByBookId(id);
            Double favorable = 0.0;
            for (String star : stars) {
                favorable += Double.parseDouble(star.substring(0, star.length() - 1));
            }
            favorableRate = String.format("%.1f", favorable / stars.size()) + "%";
        } else {
            favorableRate = "0.0%";
        }
        //全部评论
        List<EveryRemarkDto> allRemarks = bookDetailService.getRemarkByBookIdAndStarRange(id, "0%", "100%");

        //好评
        Integer goodCount = bookDetailService.getCountByBookIdAndStarRange(id, "80%", "100%");
        List<EveryRemarkDto> goodRemarks = bookDetailService.getRemarkByBookIdAndStarRange(id, "80%", "100%");
        RemarkByCateDto goodRemarkByCateDto = new RemarkByCateDto();
        goodRemarkByCateDto.setRemarkCount(goodCount);
        goodRemarkByCateDto.setEveryRemarkDtos(goodRemarks);

        //中评
        Integer middleCount = bookDetailService.getCountByBookIdAndStarRange(id, "50%", "79.99%");
        List<EveryRemarkDto> middleRemarks = bookDetailService.getRemarkByBookIdAndStarRange(id, "50%", "79.99%");
        RemarkByCateDto middleRemarkByCateDto = new RemarkByCateDto();
        middleRemarkByCateDto.setRemarkCount(middleCount);
        middleRemarkByCateDto.setEveryRemarkDtos(middleRemarks);

        //差评
        Integer badCount = bookDetailService.getCountByBookIdAndStarRange(id, "0%", "49.99%");
        List<EveryRemarkDto> badRemarks = bookDetailService.getRemarkByBookIdAndStarRange(id, "0%", "49.99%");
        RemarkByCateDto badRemarkByCateDto = new RemarkByCateDto();
        badRemarkByCateDto.setRemarkCount(badCount);
        badRemarkByCateDto.setEveryRemarkDtos(badRemarks);


        RemarkDto remarkDto = new RemarkDto();
        remarkDto.setRemarkCount(totalCount);
        remarkDto.setFavorableRate(favorableRate);
        remarkDto.setEveryRemarkDtos(allRemarks);
        remarkDto.setGoodRemarkByCateDto(goodRemarkByCateDto);
        remarkDto.setMiddleRemarkByCateDto(middleRemarkByCateDto);
        remarkDto.setBadRemarkByCateDto(badRemarkByCateDto);
        return remarkDto;
    }

    @RequestMapping(value = "checkRemark", method = RequestMethod.POST)
    @ResponseBody
    public Object checkRemark(@RequestParam("token") String token, HttpServletRequest request, @RequestParam("book_id") Integer book_id) {
        if (request.getSession().getAttribute("token") == null) {
            json = JSONSerializer.toJSON(new JsonResult<>(0, "请先登录！", null));
            return json.toString();
        }
        Claims claims = jwtUtils.parseJWT(token);
        Integer userID = (Integer) claims.get("userID");
        if (remarkService.getByUserIdAndBookId(userID, book_id) != null) {
            json = JSONSerializer.toJSON(new JsonResult<>(1, "您已经评论过！", null));
            return json.toString();
        }
        json = JSONSerializer.toJSON(new JsonResult<>(2, "未知错误！", null));
        return json.toString();
    }

    @RequestMapping(value = "insertRemarkByBookDetail", method = RequestMethod.POST)
    @ResponseBody
    public Object insertRemarkByBookDetail(@RequestParam("token") String token, Remark remark, HttpServletRequest request) {
        Claims claims = jwtUtils.parseJWT(token);
        Integer userID = (Integer) claims.get("userID");
        remark.setUser_id(userID);
        remark.setStatus(0);
        remarkService.insertSelective(remark);
        json = JSONSerializer.toJSON(new JsonResult<>(2, "评论成功！", null));
        return json.toString();
    }
}
