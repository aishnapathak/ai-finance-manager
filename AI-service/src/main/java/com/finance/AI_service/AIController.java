package com.finance.AI_service;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    private final AIService aiService;

    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/financial-summary")
    public String getFinancialSummary(@RequestBody String transactionData) {
        return aiService.getFinancialSummary(transactionData);
    }
}

