package com.book.DTO;

import lombok.Data;

import java.util.List;


@Data
public class RemarkDto {

    private Integer remarkCount;

    List<EveryRemarkDto> everyRemarkDtos;

    private String favorableRate;

    private RemarkByCateDto goodRemarkByCateDto;

    private RemarkByCateDto middleRemarkByCateDto;

    private RemarkByCateDto badRemarkByCateDto;
}
