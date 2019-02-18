package com.book.controller;

import com.book.DTO.UserDto;
import com.book.common.JwtUtils;
import com.book.entity.User;
import com.book.service.PersonalInfoService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("personalInfo/")
public class PersonalInfoController {

    @Autowired
    PersonalInfoService personalInfoService;

    @Autowired
    JwtUtils jwtUtils;

    @RequestMapping(value = "getPersonalInfo", method = RequestMethod.POST)
    @ResponseBody
    public Object getPersonalInfo(@RequestParam("token") String token) {

        Claims claims = jwtUtils.parseJWT(token);
        Integer userID = (Integer)claims.get("userID");

        User user = personalInfoService.selectByPrimaryKey(userID);
        UserDto userDto = new UserDto();
        BeanUtils.copyProperties(user, userDto);
        return userDto;
    }

    @RequestMapping(value = "savePersonalInfo", method = RequestMethod.POST)
    @ResponseBody
    public Object savePersonalInfo(@RequestParam("token") String token, User user) {

        Claims claims = jwtUtils.parseJWT(token);
        Integer userID = (Integer)claims.get("userID");
        user.setId(userID);

        personalInfoService.updateByPrimaryKeySelective(user);
        return true;
    }
}
