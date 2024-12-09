package com.finance.AI_service.impl;

import com.finance.AI_service.AIService;
import org.springframework.stereotype.Service;

@Service
public class AIServiceImpl implements AIService {

//    private static final String HUGGING_FACE_API_URL = "https://api-inference.huggingface.co/models/";
//    private static final int RETRY_DELAY =20 ;
//    private static final int MAX_RETRIES = 5;
//    private static final String PRIMARY_MODEL = "meta-llama/Llama-2-7b";
//    private static final String FALLBACK_MODEL = "distilbert-base-uncased";
//    private static final String HUGGING_FACE_API_TOKEN ="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" ;
//
//
//    @Override
//    public String getInsights(String prompt) {
//        String result = tryModel(PRIMARY_MODEL, prompt);
//
//        if (result == null) {
//            // If the primary model fails, switch to fallback model
//            result = tryModel(FALLBACK_MODEL, prompt);
//        }
//
//        return result != null ? result : "Error: Both models failed to provide insights.";
//    }
//
//    private String tryModel(String modelName, String prompt) {
//        for (int attempt = 1; attempt <= MAX_RETRIES; attempt++) {
//            try {
//                String url = UriComponentsBuilder.fromHttpUrl(HUGGING_FACE_API_URL + modelName)
//                        .toUriString();
//                RestTemplate restTemplate = new RestTemplate();
//                String response = restTemplate.postForObject(url, buildRequestBody(prompt), String.class);
//
//                if (response != null && !response.isEmpty()) {
//                    return response; // Success, return the result
//                }
//            } catch (Exception e) {
//                System.out.println("Error with model " + modelName + ": " + e.getMessage());
//            }
//
//            try {
//                Thread.sleep(20000); // Wait for 20 seconds before retrying
//            } catch (InterruptedException e) {
//                Thread.currentThread().interrupt();
//            }
//        }
//        return null; // Return null if all attempts fail
//    }
//
//    private String buildRequestBody(String prompt) {
//        return "{\"inputs\": \"" + prompt + "\"}";
//    }
}