package com.book.common;

import org.springframework.stereotype.Repository;

import java.util.Random;
import java.util.UUID;

@Repository
public class GetOrderIdByUUID {
    public static String getOrderIdByUUId() {
        int first = new Random(10).nextInt(8) + 1;
        System.out.println(first);
        int hashCodeV = UUID.randomUUID().toString().hashCode();
        if (hashCodeV < 0) {//有可能是负数
            hashCodeV = -hashCodeV;
        }
        return first + String.format("%015d", hashCodeV);
    }
}
