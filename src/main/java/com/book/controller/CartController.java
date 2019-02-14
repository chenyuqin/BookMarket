package com.book.controller;

import com.book.common.JwtUtils;
import com.book.entity.Cart;
import com.book.service.CartService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("cart/")
public class CartController {

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    CartService cartService;

    @RequestMapping(value = "add", method = RequestMethod.POST)
    @ResponseBody
    public Object add(Cart cart, @RequestParam("token") String token) {
        Claims claims = jwtUtils.parseJWT(token);
        Integer userID = (Integer)claims.get("userID");
        cart.setUser_id(userID);

        Cart checkCart = cartService.selectByBookIdAndUserId(cart.getBook_id(), cart.getUser_id());
        if (checkCart != null) {
            cart.setCount(cart.getCount() + checkCart.getCount());
            cart.setId(checkCart.getId());
            cartService.updateByPrimaryKeySelective(cart);
            return true;
        }
        cartService.insertSelective(cart);
        return true;
    }
}
