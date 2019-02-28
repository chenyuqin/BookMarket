package com.book.controller;

import com.book.DTO.*;
import com.book.common.GetOrderIdByUUID;
import com.book.common.JwtUtils;
import com.book.entity.*;
import com.book.service.*;
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

    @Autowired
    AddressService addressService;

    @Autowired
    BookDetailService bookDetailService;

    @Autowired
    RemarkService remarkService;

    @RequestMapping(value = "insertOrder", method = RequestMethod.POST)
    @ResponseBody
    public Object insertOrder(@RequestParam("token") String token, @RequestParam("ids") String ids, @RequestParam("address_id") Integer address_id, @RequestParam("pay_way") Integer pay_way, @RequestParam("count") Integer count) {
        Claims claims = jwtUtils.parseJWT(token);
        Integer userID = (Integer)claims.get("userID");

        Double totalPrice = 0.0;
        List<Orderdetail> orderdetails = new ArrayList<>();
        String totalPrices = null;

        if (count != null) {
            Book book = bookDetailService.getBookById(Integer.parseInt(ids));
            Orderdetail orderdetail = new Orderdetail();
            orderdetail.setBook_id(Integer.parseInt(ids));
            orderdetail.setCount(count);
            orderdetail.setPrice(book.getPrice());
            totalPrices = String.format("%.2f", (count * 1.0 * Double.parseDouble(book.getPrice())));
            orderdetails.add(orderdetail);
        } else {
            String[] allIds = ids.split(",");
            for (String cart_id : allIds) {
                CartDto cart = cartService.getCartByCartID(Integer.parseInt(cart_id));
                totalPrice += Double.parseDouble(cart.getPrice()) * cart.getCount();
                Orderdetail orderdetail = new Orderdetail();
                orderdetail.setBook_id(cart.getBook_id());
                orderdetail.setCount(cart.getCount());
                orderdetail.setPrice(cart.getPrice());
                orderdetails.add(orderdetail);
                cartService.deleteByPrimaryKey(Integer.parseInt(cart_id));
                totalPrices = String.format("%.2f", totalPrice);
            }
        }


        Order order = new Order();
        order.setOrder_id(GetOrderIdByUUID.getOrderIdByUUId());
        order.setAddress_id(address_id);
        order.setPay_way(pay_way);
        order.setStatus(2);
        order.setTotalPrice(totalPrices);
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
            Integer address_id = everyOrderDto.getAddress_id();
            List<OrderBookDto> orderBookByOrderId = orderService.getOrderBookByOrderId(order_id);
            Address address = addressService.selectByPrimaryKey(address_id);
            for (OrderBookDto orderBookDto : orderBookByOrderId) {
                String image1 = orderBookDto.getImage1().replace("_x_", "_b_");
                orderBookDto.setImage1(image1);
            }
            everyOrderDto.setOrderBookDtos(orderBookByOrderId);
            everyOrderDto.setAddress(address);

        }
        return orderByUserId;
    }

    //点击立即支付按钮后，修改订单的状态
    @RequestMapping(value = "updateStatusTo2", method = RequestMethod.POST)
    @ResponseBody
    public Object updateStatusTo2(@RequestParam("token") String token, @RequestParam("order_id") String order_id) {
        Order order = new Order();
        order.setOrder_id(order_id);
        order.setStatus(2);
        orderService.updateByOrderIdSelective(order);
        return true;
    }

    //点击确认收货按钮后，修改订单的状态，并修改订单详情中is_remark的值
    @RequestMapping(value = "updateStatusTo4", method = RequestMethod.POST)
    @ResponseBody
    public Object updateStatusTo4(@RequestParam("token") String token, @RequestParam("order_id") String order_id) {

        Claims claims = jwtUtils.parseJWT(token);
        Integer userID = (Integer)claims.get("userID");

        Order order = new Order();
        order.setOrder_id(order_id);
        order.setStatus(4);
        orderService.updateByOrderIdSelective(order);

        List<OrderBookDto> orderBookByOrderId = orderService.getOrderBookByOrderId(order_id);
        for (OrderBookDto orderBookDto : orderBookByOrderId) {
            if (remarkService.getByUserIdAndBookId(userID, orderBookDto.getId()) != null) {
                orderdetailService.updateIsRemarkByUserId(1, userID, orderBookDto.getId());
                Remark remark = remarkService.getByUserIdAndBookId(userID, orderBookDto.getId());
                remark.setStatus(1);
                remarkService.updateByPrimaryKeySelective(remark);
            } else {
                orderdetailService.updateIsRemarkByUserId(0, userID, orderBookDto.getId());
            }
        }

        return true;
    }
}
