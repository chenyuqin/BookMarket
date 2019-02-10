package com.book.VO;

import lombok.Data;

@Data
public class SearchByCateVO {
    String biggestCate;
    String biggerCate;
    String bigCate;
    String publisher;
    String author;
    String slowPrice;
    String highPrice;
    String slowAppraise;
    String slowDiscount;
    String highDiscount;
    Integer page;
}
