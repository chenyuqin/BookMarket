package com.book.controller;

import com.book.VO.RegisterVO;
import com.book.common.*;
import com.book.entity.User;
import com.book.service.RegisterService;
import net.sf.json.JSON;
import net.sf.json.JSONSerializer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("register/")
public class RegisterController {

    @Autowired
    RegisterService registerService;

    private JSON json;

    @RequestMapping(value = "checkUsername", method = RequestMethod.GET)
    @ResponseBody
    public String checkUsername(@RequestParam("username") String username) {
        Boolean bool = registerService.checkUsername(username);
        int state = (bool==true?StatusEnum.SUCCESS.getCode():StatusEnum.ERROR.getCode());
        String message = (bool==true?"*用户名可用！":"*用户名已被占用，请重新更换！");
        json = JSONSerializer.toJSON(new JsonResult<User>(state, message, null));
        return json.toString();
    }

    @RequestMapping(value = "checkEmail", method = RequestMethod.GET)
    @ResponseBody
    public String checkEmail(@RequestParam("email") String email) {
        Boolean bool = registerService.checkEmail(email);
        int state = (bool==true?StatusEnum.SUCCESS.getCode():StatusEnum.ERROR.getCode());
        String message = (bool==true?"*邮箱可用！":"*邮箱已被占用，请重新更换！");
        json = JSONSerializer.toJSON(new JsonResult<User>(state, message, null));
        return json.toString();
    }

    @RequestMapping(value = "register", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    @ResponseBody
    public String register(RegisterVO registerVO, HttpServletRequest request) {
        boolean checkCodeOk = new CheckCodeGen().verifyCode(registerVO.getYzm(), request, false);
        if (checkCodeOk) {
            Boolean bool1 = registerService.checkUsername(registerVO.getUsername());
            Boolean bool2 = registerService.checkEmail(registerVO.getEmail());
            if (!(bool1 && bool2)) {
                json = JSONSerializer.toJSON(new JsonResult<User>(1, "注册失败，请检查您的输入是否有误！", null));
                return json.toString();
            }
            //设置用户信息并保存
            User user = new User();
            user.setName(registerVO.getUsername());
            user.setEmail(registerVO.getEmail());
            user.setPassword(MD5Util.encode2hex(registerVO.getPassword()));
            user.setActiveCode(MD5Util.encode2hex(user.getEmail()));

            //发送激活邮件
            try {
                registerService.saveUser(user);
                //邮件的内容
                StringBuffer sb = new StringBuffer("<h1 style=\"font-weight: 0.9\">网上图书超市</h1>请点击以下的链接激活账号:<br><br>");
                sb.append("http://127.0.0.1:8088/register/active?email=");
                sb.append(user.getEmail());
                sb.append("&activeCode=");
                sb.append(user.getActiveCode());
                sb.append("");
                //发送邮件
                SendEmail.send(user.getEmail(), sb.toString());
                System.out.println("发送邮件");

                json = JSONSerializer.toJSON(new JsonResult<User>(0, "注册成功，请到邮箱中激活账号！", null));
            } catch (Exception e) {
                json = JSONSerializer.toJSON(new JsonResult<User>(1, "注册失败，请检查您的输入是否有误！", null));
                return json.toString();
            }
        } else {
            json = JSONSerializer.toJSON(new JsonResult<User>(2, "验证码错误！", null));
        }
        return json.toString();
    }

    @RequestMapping(value = "active", method = RequestMethod.GET)
    public String active(@RequestParam("email") String email, @RequestParam("activeCode") String activeCode) {
        Boolean active = registerService.active(email, activeCode);
        if (active) {
            return "activeSuccess";
        } else {
            return "activeFailed";
        }
    }
}
