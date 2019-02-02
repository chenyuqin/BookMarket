package com.book.controller;

import com.book.VO.LoginVO;
import com.book.common.CheckCodeGen;
import com.book.common.JsonResult;
import com.book.common.MD5Util;
import com.book.entity.User;
import com.book.service.LoginService;
import net.sf.json.JSON;
import net.sf.json.JSONSerializer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Map;
import java.util.UUID;

@Controller
@RequestMapping("login/")
public class LoginController {

    @Autowired
    LoginService loginService;

    private JSON json;

    @RequestMapping(value = "login", method = RequestMethod.POST)
    @ResponseBody
    public String login(LoginVO loginVO, HttpServletRequest request, HttpServletResponse response) {
        boolean checkCodeOk = new CheckCodeGen().verifyCode(loginVO.getYzm(), request, false);
        if (!checkCodeOk) {
            json = JSONSerializer.toJSON(new JsonResult<User>(2, "验证码错误！", null));
            return json.toString();
        }

        Map result = null;
        if (loginVO.getType() == 0) {
            result = loginService.checkByNameAndPassword(loginVO.getName_or_email(), MD5Util.encode2hex(loginVO.getPassword()));
        } else {
            result = loginService.checkByEmailAndPassword(loginVO.getName_or_email(), MD5Util.encode2hex(loginVO.getPassword()));
        }

        //用户不存在
        if ((Long) result.get("count") == 0) {
            json = JSONSerializer.toJSON(new JsonResult<User>(1, "用户名或者错误！", null));
        } else {
            //未激活邮箱
            if ((Integer) result.get("status") == 0) {
                json = JSONSerializer.toJSON(new JsonResult<User>(1, "请先激活邮箱！", null));
            } else {
                json = JSONSerializer.toJSON(new JsonResult<User>(0, "成功登录！", null));
                //写入客户端cookie
                Cookie cookie = null;
                String userToken = null;
                try {
                    userToken = UUID.randomUUID().toString();
                    cookie = new Cookie("token",
                            result.get("id") + "#" + URLEncoder.encode(result.get("name").toString() + "#" + userToken, "utf-8"));
                    cookie.setMaxAge(-1);
                    cookie.setPath("/");
                    response.addCookie(cookie);
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }
                //服务端在session保留凭证
                request.getSession().setAttribute("userId", result.get("id"));
                request.getSession().setAttribute("userToken", userToken);
            }
        }
        return json.toString();
    }

}