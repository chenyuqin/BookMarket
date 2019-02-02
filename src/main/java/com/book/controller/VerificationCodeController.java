package com.book.controller;

import com.book.common.CheckCodeGen;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@Controller
@RequestMapping("verification/")
public class VerificationCodeController {
	
	@RequestMapping("getCode")
	@ResponseBody
	public void validateCodeImg(HttpServletRequest request, HttpServletResponse response) {
		CheckCodeGen code = new CheckCodeGen();
		code.getRandcode(request, response);
	}
	
}
