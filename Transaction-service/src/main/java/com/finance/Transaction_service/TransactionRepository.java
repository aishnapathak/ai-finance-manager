package com.finance.Transaction_service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByUserId(Long userId);

    @Query("SELECT t FROM Transaction t " +
            "WHERE t.userId = :userId " +
            "AND (:category IS NULL OR t.category = :category) " +
            "AND (:startDate IS NULL OR t.transactionDate >= :startDate) " +
            "AND (:endDate IS NULL OR t.transactionDate <= :endDate) " +
            "AND (:minAmount IS NULL OR t.amount >= :minAmount) " +
            "AND (:maxAmount IS NULL OR t.amount <= :maxAmount)")
    List<Transaction> filterTransactions(
            @Param("userId") Long userId,
            @Param("category") String category,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate,
            @Param("minAmount") BigDecimal minAmount,
            @Param("maxAmount") BigDecimal maxAmount);



    // Query to get monthly income or spending trends
    @Query("SELECT EXTRACT(YEAR FROM t.transactionDate) AS year, " +
            "EXTRACT(MONTH FROM t.transactionDate) AS month, " +
            "SUM(CASE WHEN t.type = 'Income' THEN t.amount ELSE -t.amount END) AS totalAmount " +
            "FROM Transaction t " +
            "WHERE t.userId = :userId " +
            "AND t.transactionDate BETWEEN :startDate AND :endDate " +
            "GROUP BY year, month " +
            "ORDER BY year, month")
    List<Object[]> getMonthlySpendingIncomeTrend(
            @Param("userId") Long userId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    //Query to calculate complete income for a month
    @Query("SELECT EXTRACT(YEAR FROM t.transactionDate) AS year, " +
            "EXTRACT(MONTH FROM t.transactionDate) AS month, " +
            "SUM(CASE WHEN t.type = 'Income' THEN t.amount ELSE 0 END) AS totalAmount " +
            "FROM Transaction t " +
            "WHERE t.userId = :userId " +
            "AND t.transactionDate BETWEEN :startDate AND :endDate " +
            "GROUP BY year, month " +
            "ORDER BY year, month")
    List<Object[]> getMonthlyIncomeTrend(
            @Param("userId") Long userId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    //Query to calculate monthly expenses
    @Query("SELECT EXTRACT(YEAR FROM t.transactionDate) AS year, " +
            "EXTRACT(MONTH FROM t.transactionDate) AS month, " +
            "SUM(CASE WHEN t.type = 'Expense' THEN t.amount ELSE 0 END) AS totalAmount " +
            "FROM Transaction t " +
            "WHERE t.userId = :userId " +
            "AND t.transactionDate BETWEEN :startDate AND :endDate " +
            "GROUP BY year, month " +
            "ORDER BY year, month")
    List<Object[]> getMonthlySpendingTrend(
            @Param("userId") Long userId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

}
