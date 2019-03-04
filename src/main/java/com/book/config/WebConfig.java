package com.book.config;

import com.book.interceptor.LoginInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Bean
    LoginInterceptor loginInterceptor() {
        return new LoginInterceptor();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(loginInterceptor())
                .addPathPatterns("/**")
                .excludePathPatterns("/activeSuccess.html",
                        "/to_login.html",
                        "/book_detail.html",
                        "/forget_pwd.html",
                        "/changeSuccess.html",
                        "/header.html",
                        "/index.html",
                        "/login.html",
                        "/rank.html",
                        "/register.html",
                        "/search.html",
                        "/search_by_cate.html",
                        "/notice.html",
                        "/static/**",
                        "/to_login",
                        "/bookDetail/**",
                        "/forget/**",
                        "/index/**",
                        "/login/**",
                        "/rank/**",
                        "/register/**",
                        "/searchByCate/**",
                        "/search/**",
                        "/verification/**");
    }
}
