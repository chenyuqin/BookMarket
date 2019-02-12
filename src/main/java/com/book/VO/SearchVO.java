package com.book.VO;

import lombok.Data;

@Data
public class SearchVO {
    String queryString;
    String bigCate;
    String publisher;
    String author;
    Integer page;
}
