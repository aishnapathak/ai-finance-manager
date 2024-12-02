package com.finance.Transaction_service.impl;

import com.finance.Transaction_service.Transaction;
import com.finance.Transaction_service.TransactionRepository;
import com.finance.Transaction_service.TransactionService;
import com.finance.Transaction_service.dto.TransactionDTO;
import com.finance.Transaction_service.external.UserServiceClient;
import com.finance.Transaction_service.mapper.TransactionMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {
    private final TransactionRepository transactionRepository;
    private final UserServiceClient userServiceClient;
    private final TransactionMapper transactionMapper = TransactionMapper.INSTANCE;

    @Override
    public TransactionDTO createTransaction(TransactionDTO transactionDTO) {
        Long userId = transactionDTO.getUserId();
        if(!userServiceClient.isValidUser(userId)){
            throw new IllegalArgumentException("Invalid user ID");
        }
        Transaction transaction = transactionMapper.toEntity(transactionDTO);
        transaction = transactionRepository.save(transaction);
        return transactionMapper.toDTO(transaction);
    }

    @Override
    public List<TransactionDTO> getTransactionsByUserId(Long userId) {
        List<Transaction> transactions = transactionRepository.findByUserId(userId);
        return transactions.stream()
                .map(transactionMapper::toDTO)
                .collect(Collectors.toList());
    }
}
