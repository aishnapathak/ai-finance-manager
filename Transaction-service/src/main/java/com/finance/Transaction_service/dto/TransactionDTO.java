package com.finance.Transaction_service.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class TransactionDTO {
    private Long id;
    private Long userId;
    private BigDecimal amount;
    private String category;
    private String type;
    private LocalDate transactionDate;
    private String description;
}
