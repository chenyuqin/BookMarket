package com.book.controller;

import com.book.DTO.CartDto;
import com.book.DTO.NewBookSaleDto;
import com.book.DTO.ReOrderDto;
import com.book.common.JwtUtils;
import com.book.entity.Address;
import com.book.entity.Book;
import com.book.entity.Cart;
import com.book.service.AddressService;
import com.book.service.BookDetailService;
import com.book.service.CartService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("cart/")
public class CartController {

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    CartService cartService;

    @Autowired
    AddressService addressService;

    @Autowired
    BookDetailService bookDetailService;

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

    @RequestMapping(value = "getCount", method = RequestMethod.POST)
    @ResponseBody
    public Object getCount(@RequestParam("token") String token) {
        Claims claims = jwtUtils.parseJWT(token);
        Integer userID = (Integer)claims.get("userID");
        Integer integer = cartService.selectCountByUserId(userID);
        return integer;
    }

    @RequestMapping(value = "getCarts", method = RequestMethod.POST)
    @ResponseBody
    public Object getCartsByUserID(@RequestParam("token") String token) {
        Claims claims = jwtUtils.parseJWT(token);
        Integer userID = (Integer)claims.get("userID");
        List<CartDto> carts = cartService.getCartsByUserID(userID);
        for (CartDto cartDto : carts) {
            String image1 = cartDto.getImage1().replace("_x_", "_b_");
            cartDto.setImage1(image1);
        }
        return carts;
    }

    @RequestMapping(value = "deleteById", method = RequestMethod.POST)
    @ResponseBody
    public Object deleteById(@RequestParam("token") String token, @RequestParam("cart_id") Integer cart_id) {
        cartService.deleteByPrimaryKey(cart_id);
        return true;
    }

    @RequestMapping(value = "updateCount", method = RequestMethod.POST)
    @ResponseBody
    public Object updateCount(@RequestParam("token") String token, @RequestParam("cart_id") Integer cart_id, @RequestParam("num") Integer num) {
        Cart cart = new Cart();
        cart.setId(cart_id);
        cart.setCount(num);
        cartService.updateByPrimaryKeySelective(cart);
        return true;
    }

    @RequestMapping(value = "getOrderInfo", method = RequestMethod.POST)
    @ResponseBody
    public Object getCartById(@RequestParam("token") String token, @RequestParam("ids") String ids, @RequestParam("count") Integer count) {
        Claims claims = jwtUtils.parseJWT(token);
        Integer userID = (Integer)claims.get("userID");
        List<CartDto> cartDtos = new ArrayList<>();
        Double totalPrice = 0.0;
        String totalPrices;
        if (count != null) {
            Book book = bookDetailService.getBookById(Integer.parseInt(ids));
            CartDto cartDto = new CartDto();
            BeanUtils.copyProperties(book, cartDto);
            cartDto.setBook_id(Integer.parseInt(ids));
            cartDto.setCount(count);
            cartDto.setImage1(cartDto.getImage1().replace("_x_", "_b_"));
            cartDtos.add(cartDto);
            totalPrices = String.format("%.2f", (count * 1.0 * Double.parseDouble(book.getPrice())));
        } else {
            String[] allIds = ids.split(",");
            for (String cart_id : allIds) {
                CartDto cart = cartService.getCartByCartID(Integer.parseInt(cart_id));
                cart.setImage1(cart.getImage1().replace("_x_", "_b_"));
                cartDtos.add(cart);
                totalPrice += Double.parseDouble(cart.getPrice()) * cart.getCount();
            }
            totalPrices = String.format("%.2f", totalPrice);
        }

        List<Address> addresses = addressService.selectAllByUserId(userID);

        ReOrderDto reOrderDto = new ReOrderDto();
        reOrderDto.setCartDtos(cartDtos);
        reOrderDto.setAddresses(addresses);
        reOrderDto.setTotalPrice(totalPrices);
        return reOrderDto;
    }
}
