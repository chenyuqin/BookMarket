package com.book.common;

import java.io.Serializable;

//状态码枚举类
public enum StatusEnum implements Serializable {
    SUCCESS(0),
    ERROR(1);

    int code;
    StatusEnum(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }
}
