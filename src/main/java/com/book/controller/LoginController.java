package com.book.controller;

import com.book.VO.LoginVO;
import com.book.common.CheckCodeGen;
import com.book.common.JsonResult;
import com.book.common.JwtUtils;
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

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@Controller
@RequestMapping("login/")
public class LoginController {

    @Autowired
    LoginService loginService;

    private JSON json;

    @Autowired
    JwtUtils jwtUtils;

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
            json = JSONSerializer.toJSON(new JsonResult<User>(1, "用户名或者密码错误！", null));
        } else {
            //未激活邮箱
            if ((Integer) result.get("status") == 0) {
                json = JSONSerializer.toJSON(new JsonResult<User>(1, "请先激活邮箱！", null));
            } else {
                //服务端在session保留凭证
                String token = jwtUtils.createJWT((Integer) result.get("id"), result.get("name").toString(), 7 * 24);
                result.put("token", token);
                request.getSession().setAttribute("token", token);
                json = JSONSerializer.toJSON(new JsonResult<>(0, "成功登录！", result));
            }
        }
        return json.toString();
    }

}
