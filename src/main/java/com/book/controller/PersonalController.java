package com.book.controller;

import com.book.DTO.PersonalDto;
import com.book.common.JwtUtils;
import com.book.entity.User;
import com.book.service.PersonalService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("personal/")
public class PersonalController {

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    PersonalService personalService;

    @RequestMapping(value = "init", method = RequestMethod.POST)
    @ResponseBody
    public Object init(@RequestParam("token") String token) {
        Claims claims = jwtUtils.parseJWT(token);
        Integer id = (Integer)claims.get("userID");
        User user = personalService.selectByPrimaryKey(id);
        String returnEmail = user.getEmail().split("@")[0].replace((user.getEmail().split("@")[0].substring((user.getEmail().split("@")[0].length() / 2 - 2), (user.getEmail().split("@")[0].length() / 2 + 2))), "****") + "@" + user.getEmail().split("@")[1];
        user.setEmail(returnEmail);

        PersonalDto personalDto = new PersonalDto();
        personalDto.setUser(user);
        return personalDto;
    }
}
