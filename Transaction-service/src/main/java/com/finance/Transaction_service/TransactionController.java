package com.finance.Transaction_service;

import com.finance.Transaction_service.dto.MonthlyAnalyticsDTO;
import com.finance.Transaction_service.dto.TransactionDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/transaction")
@RequiredArgsConstructor
public class TransactionController {
    private final TransactionService transactionService;

    @PostMapping
    public ResponseEntity<TransactionDTO> createTransaction(@RequestBody TransactionDTO transactionDTO) {
        TransactionDTO createdTransaction = transactionService.createTransaction(transactionDTO);
        return ResponseEntity.ok(createdTransaction);
    }

//    @GetMapping("/user/{userId}")
//    public ResponseEntity<List<TransactionDTO>> getTransactionsByUserId(@PathVariable Long userId) {
//        List<TransactionDTO> transactions = transactionService.getTransactionsByUserId(userId);
//        return ResponseEntity.ok(transactions);
//    }
    @PutMapping("/{id}")
    public ResponseEntity<TransactionDTO> updateTransaction(@PathVariable Long id, @RequestBody TransactionDTO transactionDTO) {
        TransactionDTO updatedTransaction = transactionService.updateTransaction(id, transactionDTO);
        return ResponseEntity.ok(updatedTransaction);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable Long id) {
        transactionService.deleteTransaction(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<TransactionDTO>> getAllTransactions() {
        List<TransactionDTO> transactions = transactionService.getAllTransactions();
        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<TransactionDTO>> filterTransactions(
            @RequestParam Long userId,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(required = false) BigDecimal minAmount,
            @RequestParam(required = false) BigDecimal maxAmount) {
        List<TransactionDTO> transactions = transactionService.filterTransactions(userId,category, startDate, endDate,  minAmount, maxAmount);
        return ResponseEntity.ok(transactions);
    }


    @GetMapping("/analytics")
    public List<MonthlyAnalyticsDTO> getMonthlyAnalytics(
            @RequestParam Long userId,
            @RequestParam(required = false) LocalDate startDate,
            @RequestParam(required = false) LocalDate endDate) {
        return transactionService.getMonthlySpendingIncomeTrend(userId, startDate, endDate);
    }

    @GetMapping
    public List<TransactionDTO> getTransactionsByUser(@RequestParam Long userId) {
        // Fetch transactions for the user from the database
        return transactionService.getTransactionsByUserId(userId);
    }

}
