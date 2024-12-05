package com.finance.AI_service;

public interface AIService {
    String getFinancialSummary(String transactionData);
    String constructRequestPayload(String transactionData);
    String sendToOllama(String requestPayload);
}
