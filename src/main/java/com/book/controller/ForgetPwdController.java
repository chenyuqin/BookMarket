package com.book.controller;

import com.book.common.CheckCodeGen;
import com.book.common.JsonResult;
import com.book.common.MD5Util;
import com.book.common.SendEmail;
import com.book.entity.User;
import com.book.service.ForgetPwdService;
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
@RequestMapping("forget/")
public class ForgetPwdController {

    @Autowired
    ForgetPwdService forgetPwdService;

    private JSON json;

    @RequestMapping(value = "forget", method = RequestMethod.GET)
    @ResponseBody
    public String forget(@RequestParam("name") String name, @RequestParam("yzm") String yzm, HttpServletRequest request) {
        boolean checkCodeOk = new CheckCodeGen().verifyCode(yzm, request, false);
        if (!checkCodeOk) {
            json = JSONSerializer.toJSON(new JsonResult<User>(2, "验证码错误，请重新输入！", null));
            return json.toString();
        }

        Boolean isUserExist = forgetPwdService.checkUsername(name);
        if (isUserExist) {
            json = JSONSerializer.toJSON(new JsonResult<User>(1, "用户不存在，请重新检查用户名！", null));
            return json.toString();
        }

        String email = forgetPwdService.findEmailByName(name);
        String returnEmail = email.split("@")[0].replace((email.split("@")[0].substring((email.split("@")[0].length() / 2 - 2), (email.split("@")[0].length() / 2 + 2))), "****") + "@" + email.split("@")[1];
        System.out.println(returnEmail);
        try {
            //邮件的内容
            StringBuffer sb = new StringBuffer("<h1 style=\"font-weight: 0.9\">网上图书超市</h1>请点击以下链接前往修改密码 :<br><span style=\"color:red;\">注意：若此操作不是您所触发的，请不要点击任何链接！</span><br><br>");
            sb.append("http://127.0.0.1:8088/forget_pwd.html?q=3");
            sb.append("&token=");
            sb.append(MD5Util.encode2hex(email));
            sb.append("");
            //发送邮件
            SendEmail.send(email, sb.toString());
            System.out.println("发送邮件");

            json = JSONSerializer.toJSON(new JsonResult<String>(0, "发送邮件成功，请到邮箱中验证修改密码！", returnEmail));
        } catch (Exception e) {
            json = JSONSerializer.toJSON(new JsonResult<User>(1, "发送邮件失败，请稍后重试！", null));
            return json.toString();
        }
        return json.toString();
    }

    @RequestMapping(value = "change", method = RequestMethod.POST)
    @ResponseBody
    public String change(@RequestParam("password") String password, @RequestParam("token") String token) {
        try {
            forgetPwdService.updatePasswordByToken(MD5Util.encode2hex(password), token);
            json = JSONSerializer.toJSON(new JsonResult<User>(0, "密码修改完成！", null));
            return json.toString();
        } catch (Exception e) {
            json = JSONSerializer.toJSON(new JsonResult<User>(1, "未知错误！", null));
            return json.toString();
        }
    }
}
