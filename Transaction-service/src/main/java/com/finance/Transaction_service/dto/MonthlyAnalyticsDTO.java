package com.finance.Transaction_service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class MonthlyAnalyticsDTO {
    private int year;
    private int month;
    private double totalAmount;
}
