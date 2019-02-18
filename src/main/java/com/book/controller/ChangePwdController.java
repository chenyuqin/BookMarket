package com.book.controller;

import com.book.VO.ChangePwdVo;
import com.book.common.CheckCodeGen;
import com.book.common.JsonResult;
import com.book.common.JwtUtils;
import com.book.common.MD5Util;
import com.book.entity.User;
import com.book.service.ChangePwdService;
import io.jsonwebtoken.Claims;
import net.sf.json.JSON;
import net.sf.json.JSONSerializer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("changePwd/")
public class ChangePwdController {

    private JSON json;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    ChangePwdService changePwdService;

    @RequestMapping(value = "changePwd", method = RequestMethod.POST)
    @ResponseBody
    public Object changePwd(@RequestParam("token") String token, ChangePwdVo changePwdVo, HttpServletRequest request, HttpServletResponse response) {
        Claims claims = jwtUtils.parseJWT(token);
        Integer userID = (Integer)claims.get("userID");

        if (!changePwdVo.getNew_pwd().equals(changePwdVo.getRe_new_pwd())) {
            json = JSONSerializer.toJSON(new JsonResult<>(0, "两次密码不一致！", null));
            return json.toString();
        }
        boolean checkCodeOk = new CheckCodeGen().verifyCode(changePwdVo.getCode(), request, false);
        if (!checkCodeOk) {
            json = JSONSerializer.toJSON(new JsonResult<User>(2, "验证码错误！", null));
            return json.toString();
        }
        User user = changePwdService.selectByPrimaryKeyAndPwd(userID, MD5Util.encode2hex(((changePwdVo.getOld_pwd()))));
        if (user == null) {
            json = JSONSerializer.toJSON(new JsonResult<>(1, "原密码错误！", null));
            return json.toString();
        }
        user.setPassword(MD5Util.encode2hex((changePwdVo.getNew_pwd())));
        changePwdService.updateByPrimaryKeySelective(user);
        json = JSONSerializer.toJSON(new JsonResult<User>(3, "密码修改成功！", null));
        return json.toString();
    }

}
