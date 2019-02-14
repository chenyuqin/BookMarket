package com.book.controller;

import com.book.common.JwtUtils;
import com.book.entity.Address;
import com.book.service.AddressService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("address/")
public class AddressController {

    @Autowired
    AddressService addressService;

    @Autowired
    JwtUtils jwtUtils;

    @RequestMapping(value = "add", method = RequestMethod.POST)
    @ResponseBody
    public Object add(Address address, @RequestParam("token") String token) {
        Claims claims = jwtUtils.parseJWT(token);
        Integer userID = (Integer) claims.get("userID");
        address.setUser_id(userID);
        addressService.insertSelective(address);
        return true;
    }

    @RequestMapping(value = "init", method = RequestMethod.POST)
    @ResponseBody
    public Object init(@RequestParam("token") String token) {
        Claims claims = jwtUtils.parseJWT(token);
        Integer userID = (Integer) claims.get("userID");
        List<Address> addresses = addressService.selectAllByUserId(userID);
        return addresses;
    }

    @RequestMapping(value = "delete", method = RequestMethod.POST)
    @ResponseBody
    public Object delete(@RequestParam("token") String token, @RequestParam("id") Integer id) {
        addressService.deleteByPrimaryKey(id);
        return true;
    }

    @RequestMapping(value = "getById", method = RequestMethod.POST)
    @ResponseBody
    public Object getById(@RequestParam("token") String token, @RequestParam("id") Integer id) {
        Address address = addressService.selectByPrimaryKey(id);
        return address;
    }

    @RequestMapping(value = "update", method = RequestMethod.POST)
    @ResponseBody
    public Object update(Address address, @RequestParam("token") String token) {
        addressService.updateByPrimaryKeySelective(address);
        return true;
    }
}
