package com.finance.Transaction_service.impl;

import com.finance.Transaction_service.Transaction;
import com.finance.Transaction_service.TransactionRepository;
import com.finance.Transaction_service.TransactionService;
import com.finance.Transaction_service.dto.MonthlyAnalyticsDTO;
import com.finance.Transaction_service.dto.TransactionDTO;
import com.finance.Transaction_service.exception.ResourceNotFoundException;
import com.finance.Transaction_service.external.UserServiceClient;
import com.finance.Transaction_service.mapper.TransactionMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
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
        // Log the saved transaction ID to verify it's generated
        //System.out.println("Saved Transaction ID: " + transaction.getId());

        // Map the saved Transaction entity back to DTO with the generated ID
        TransactionDTO savedTransactionDTO = transactionMapper.toDTO(transaction);

        // Debug log for DTO to check if the ID is populated
        //System.out.println("TransactionDTO ID: " + savedTransactionDTO.getId());

        return savedTransactionDTO;
    }

    @Override
    public List<TransactionDTO> getTransactionsByUserId(Long userId) {
        List<Transaction> transactions = transactionRepository.findByUserId(userId);
        return transactions.stream()
                .map(transactionMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public TransactionDTO updateTransaction(Long id, TransactionDTO transactionDTO) {
        Transaction existingTransaction = transactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found with ID: " + id));

        if (transactionDTO.getAmount() != null) {
            existingTransaction.setAmount(transactionDTO.getAmount());
        }
        if (transactionDTO.getDescription() != null) {
            existingTransaction.setDescription(transactionDTO.getDescription());
        }
        if (transactionDTO.getTransactionDate() != null) {
            existingTransaction.setTransactionDate(transactionDTO.getTransactionDate());
        }
        if (transactionDTO.getUserId() != null && !userServiceClient.isValidUser(transactionDTO.getUserId())) {
            throw new IllegalArgumentException("Invalid user ID: " + transactionDTO.getUserId());
        }
        existingTransaction.setUserId(transactionDTO.getUserId());

        Transaction updatedTransaction = transactionRepository.save(existingTransaction);
        return transactionMapper.toDTO(updatedTransaction);
    }

    @Override
    public void deleteTransaction(Long id) {
        Transaction existingTransaction = transactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found with ID: " + id));
        transactionRepository.delete(existingTransaction);
    }

    @Override
    public List<TransactionDTO> getAllTransactions() {
        List<Transaction> transactions = transactionRepository.findAll();
        return transactions.stream().map(transactionMapper::toDTO).toList();
    }

    @Override
    public List<TransactionDTO> filterTransactions(Long userId,String type, LocalDate startDate, LocalDate endDate,  BigDecimal minAmount, BigDecimal maxAmount) {
        if (minAmount == null) {
            minAmount = BigDecimal.valueOf(Double.MIN_VALUE);
        }
        if (maxAmount == null) {
            maxAmount = BigDecimal.valueOf(Double.MAX_VALUE);
        }
        List<Transaction> transactions = transactionRepository.filterTransactions(userId, type, startDate, endDate,  minAmount, maxAmount);
        return transactions.stream().map(transactionMapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<MonthlyAnalyticsDTO> getMonthlySpendingIncomeTrend(Long userId, LocalDate startDate, LocalDate endDate) {
        List<Object[]> results = transactionRepository.getMonthlySpendingIncomeTrend(userId, startDate, endDate);
        List<MonthlyAnalyticsDTO> analyticsList = new ArrayList<>();

        for (Object[] result : results) {
            int year = ((Number) result[0]).intValue();
            int month = ((Number) result[1]).intValue();
            double totalAmount = ((Number) result[2]).doubleValue();

            MonthlyAnalyticsDTO dto = new MonthlyAnalyticsDTO(year, month, totalAmount);
            analyticsList.add(dto);
        }
        return analyticsList;
    }

    @Override
    public List<MonthlyAnalyticsDTO> getMonthlyIncomeTrend(Long userId, LocalDate startDate, LocalDate endDate) {
        List<Object[]> results = transactionRepository.getMonthlyIncomeTrend(userId, startDate, endDate);
        List<MonthlyAnalyticsDTO> analyticsList = new ArrayList<>();

        for (Object[] result : results) {
            int year = ((Number) result[0]).intValue();
            int month = ((Number) result[1]).intValue();
            double totalAmount = ((Number) result[2]).doubleValue();

            MonthlyAnalyticsDTO dto = new MonthlyAnalyticsDTO(year, month, totalAmount);
            analyticsList.add(dto);
        }
        return analyticsList;
    }

    @Override
    public List<MonthlyAnalyticsDTO> getMonthlySpendingTrend(Long userId, LocalDate startDate, LocalDate endDate) {
        List<Object[]> results = transactionRepository.getMonthlySpendingTrend(userId, startDate, endDate);
        List<MonthlyAnalyticsDTO> analyticsList = new ArrayList<>();

        for (Object[] result : results) {
            int year = ((Number) result[0]).intValue();
            int month = ((Number) result[1]).intValue();
            double totalAmount = ((Number) result[2]).doubleValue();

            MonthlyAnalyticsDTO dto = new MonthlyAnalyticsDTO(year, month, totalAmount);
            analyticsList.add(dto);
        }
        return analyticsList;
    }

}

