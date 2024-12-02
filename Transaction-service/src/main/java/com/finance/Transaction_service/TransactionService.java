package com.finance.Transaction_service;

import com.finance.Transaction_service.dto.TransactionDTO;

import java.util.List;

public interface TransactionService {
    TransactionDTO createTransaction(TransactionDTO transactionDTO);
    List<TransactionDTO> getTransactionsByUserId(Long userId);
}
