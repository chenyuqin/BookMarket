package com.book.controller;

import com.book.DTO.*;
import com.book.common.GetOrderIdByUUID;
import com.book.common.JwtUtils;
import com.book.entity.Book;
import com.book.entity.Order;
import com.book.entity.Orderdetail;
import com.book.service.CartService;
import com.book.service.GuessYouLikeService;
import com.book.service.OrderService;
import com.book.service.OrderdetailService;
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

@RequestMapping("order/")
@Controller
public class OrderController {

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    CartService cartService;

    @Autowired
    OrderService orderService;

    @Autowired
    OrderdetailService orderdetailService;

    @Autowired
    GuessYouLikeService guessYouLikeService;

    @RequestMapping(value = "insertOrder", method = RequestMethod.POST)
    @ResponseBody
    public Object insertOrder(@RequestParam("token") String token, @RequestParam("ids") String ids, @RequestParam("address_id") Integer address_id, @RequestParam("pay_way") Integer pay_way) {
        Claims claims = jwtUtils.parseJWT(token);
        Integer userID = (Integer)claims.get("userID");

        String[] allIds = ids.split(",");
        Double totalPrice = 0.0;
        List<Orderdetail> orderdetails = new ArrayList<>();
        for (String cart_id : allIds) {
            CartDto cart = cartService.getCartByCartID(Integer.parseInt(cart_id));
            totalPrice += Double.parseDouble(cart.getPrice()) * cart.getCount();
            Orderdetail orderdetail = new Orderdetail();
            orderdetail.setBook_id(cart.getBook_id());
            orderdetail.setCount(cart.getCount());
            orderdetail.setPrice(cart.getPrice());
            orderdetails.add(orderdetail);
            cartService.deleteByPrimaryKey(Integer.parseInt(cart_id));
        }

        Order order = new Order();
        order.setOrder_id(GetOrderIdByUUID.getOrderIdByUUId());
        order.setAddress_id(address_id);
        order.setPay_way(pay_way);
        order.setStatus(1);
        order.setTotalPrice(totalPrice + "");
        order.setUser_id(userID);
        orderService.insertSelective(order);

        for (Orderdetail orderdetail : orderdetails) {
            orderdetail.setOrder_id(order.getOrder_id());
            orderdetailService.insertSelective(orderdetail);
        }
        return true;
    }

    //支付成功界面的猜你喜欢
    @RequestMapping(value = "getLikeBooks", method = RequestMethod.POST)
    @ResponseBody
    public Object getLikeBooks(@RequestParam("token") String token) {
        List<GuessYouLikeDto> guessYouLikeDtos = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            int randomId = 1+(int)(Math.random() * (guessYouLikeService.getCount()));
            Book book = guessYouLikeService.guessYouLike(randomId);
            GuessYouLikeDto guessYouLikeDto = new GuessYouLikeDto();
            BeanUtils.copyProperties(book, guessYouLikeDto);
            String image1 = guessYouLikeDto.getImage1().replace("_x_", "_b_");
            guessYouLikeDto.setImage1(image1);
            guessYouLikeDtos.add(guessYouLikeDto);
        }
        return guessYouLikeDtos;
    }

    @RequestMapping(value = "getOrdersByStatus", method = RequestMethod.POST)
    @ResponseBody
    public Object getOrdersByStatus(@RequestParam("token") String token, @RequestParam("status") Integer status) {
        if (status == 0) {
            status = null;
        }
        Claims claims = jwtUtils.parseJWT(token);
        Integer userID = (Integer)claims.get("userID");

        List<EveryOrderDto> orderByUserId = orderService.getOrderByUserId(userID, status);
        for (EveryOrderDto everyOrderDto : orderByUserId) {
            String order_id = everyOrderDto.getOrder_id();
            List<OrderBookDto> orderBookByOrderId = orderService.getOrderBookByOrderId(order_id);
            for (OrderBookDto orderBookDto : orderBookByOrderId) {
                String image1 = orderBookDto.getImage1().replace("_x_", "_b_");
                orderBookDto.setImage1(image1);
            }
            everyOrderDto.setOrderBookDtos(orderBookByOrderId);
        }
        return orderByUserId;
    }
}
