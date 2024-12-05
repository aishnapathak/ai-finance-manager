package com.finance.AI_service.impl;

import com.finance.AI_service.AIService;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AIServiceImpl implements AIService {

    @Value("${ollama.api.url}")
    private String ollamaApiUrl;

    private final RestTemplate restTemplate;

    public AIServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String getFinancialSummary(String transactionData) {
        // Construct the request body to send to Ollama
        String requestPayload = constructRequestPayload(transactionData);

        // Send the request to Ollama
        String response = sendToOllama(requestPayload);

        return response;
    }

    public String constructRequestPayload(String transactionData) {
        // Here you can format the transaction data for the AI model
        return "{ \"input\": \"" + transactionData + "\", \"model\": \"llama\" }";
    }

    public String sendToOllama(String requestPayload) {
        try {
            // Set up headers for authentication
            HttpHeaders headers = new HttpHeaders();
            headers.setBasicAuth(System.getenv("USER_NAME"), System.getenv("USER_PASSWORD"));
            headers.setContentType(org.springframework.http.MediaType.APPLICATION_JSON);

            // Attach headers and request payload
            HttpEntity<String> entity = new HttpEntity<>(requestPayload, headers);

            // Make the POST request
            ResponseEntity<String> response = restTemplate.exchange(ollamaApiUrl, HttpMethod.POST, entity, String.class);
            return response.getBody();
        } catch (Exception e) {
            e.printStackTrace();
            return "Error fetching insights from Ollama";
        }
    }
}

