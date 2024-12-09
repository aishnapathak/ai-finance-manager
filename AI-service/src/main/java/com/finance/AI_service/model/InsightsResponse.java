package com.finance.AI_service.model;

import com.fasterxml.jackson.databind.ObjectMapper;

public class InsightsResponse {
    private String insight;

    public String getInsight() {
        return insight;
    }

    public void setInsight(String insight) {
        this.insight = insight;
    }

    public static InsightsResponse fromJson(String json) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            return mapper.readValue(json, InsightsResponse.class);
        } catch (Exception e) {
            throw new RuntimeException("Error converting JSON to response", e);
        }
    }
}