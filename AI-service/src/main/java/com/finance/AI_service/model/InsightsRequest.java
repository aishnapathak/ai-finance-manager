package com.finance.AI_service.model;

import com.fasterxml.jackson.databind.ObjectMapper;

public class InsightsRequest {
    private String prompt;

    public String getPrompt() {
        return prompt;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }

    public String toJson() {
        try {
            ObjectMapper mapper = new ObjectMapper();
            return mapper.writeValueAsString(this);
        } catch (Exception e) {
            throw new RuntimeException("Error converting request to JSON", e);
        }
    }
}
