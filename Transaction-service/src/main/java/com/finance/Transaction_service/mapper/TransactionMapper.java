package com.finance.Transaction_service.mapper;

import com.finance.Transaction_service.Transaction;
import com.finance.Transaction_service.dto.TransactionDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import java.time.LocalDate;

@Mapper
public interface TransactionMapper {
    TransactionMapper INSTANCE = Mappers.getMapper(TransactionMapper.class);

    @Mapping(source = "id", target = "id")
    @Mapping(source = "transactionDate", target = "transactionDate") // Add explicit mapping for transactionDate
    TransactionDTO toDTO(Transaction transaction);

    @Mapping(source = "id", target = "id")
    @Mapping(source = "transactionDate", target = "transactionDate") // Add explicit mapping for transactionDate
    Transaction toEntity(TransactionDTO transactionDTO);

    // Optional: If you need to convert LocalDateTime to LocalDate or vice versa
    default LocalDate mapToLocalDate(java.time.LocalDateTime dateTime) {
        return dateTime != null ? dateTime.toLocalDate() : null;
    }

    default java.time.LocalDateTime mapToLocalDateTime(LocalDate date) {
        return date != null ? date.atStartOfDay() : null;
    }
}
