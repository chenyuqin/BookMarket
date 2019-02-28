package com.book;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@MapperScan("com.book.mapper")
@SpringBootApplication
public class BookApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(BookApplication.class, args);
    }

    //为了打包springboot项目
    @Override
    protected SpringApplicationBuilder configure(
            SpringApplicationBuilder builder) {
        return builder.sources(this.getClass());
    }
}

