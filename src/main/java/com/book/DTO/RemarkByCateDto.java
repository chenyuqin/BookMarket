package com.book.DTO;

import lombok.Data;

import java.util.List;

@Data
public class RemarkByCateDto {

    private Integer remarkCount;

    List<EveryRemarkDto> everyRemarkDtos;
}
