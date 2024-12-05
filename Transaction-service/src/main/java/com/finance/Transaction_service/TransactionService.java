package com.finance.Transaction_service;

import com.finance.Transaction_service.dto.MonthlyAnalyticsDTO;
import com.finance.Transaction_service.dto.TransactionDTO;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface TransactionService {
    TransactionDTO createTransaction(TransactionDTO transactionDTO);
    List<TransactionDTO> getTransactionsByUserId(Long userId);
    TransactionDTO updateTransaction(Long id, TransactionDTO transactionDTO);
    void deleteTransaction(Long id);
    List<TransactionDTO> getAllTransactions();
    List<TransactionDTO> filterTransactions(Long userId, String category, LocalDate startDate, LocalDate endDate, BigDecimal minAmount, BigDecimal maxAmount);

    List<MonthlyAnalyticsDTO> getMonthlySpendingIncomeTrend(Long userId, LocalDate startDate, LocalDate endDate);
}
