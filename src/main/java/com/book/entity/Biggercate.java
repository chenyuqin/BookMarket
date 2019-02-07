package com.book.entity;

public class Biggercate {
    private Integer id;

    private String cateName;

    private Integer biggestCate_id;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCateName() {
        return cateName;
    }

    public void setCateName(String cateName) {
        this.cateName = cateName == null ? null : cateName.trim();
    }

    public Integer getBiggestCate_id() {
        return biggestCate_id;
    }

    public void setBiggestCate_id(Integer biggestCate_id) {
        this.biggestCate_id = biggestCate_id;
    }
}