package com.finance.Transaction_service.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class TransactionDTO {
    private Long userId;
    private BigDecimal amount;
    private String category;
    private String type;
    private LocalDateTime transactionDate;
    private String description;
}
