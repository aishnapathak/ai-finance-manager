package com.finance.AI_service;

import com.finance.Transaction_service.Transaction;
import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.boot.autoconfigure.pulsar.PulsarProperties;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

import java.util.List;
import java.util.Map;

@RestController
public class AIController {

    private final OllamaChatModel chatModel;
    private final WebClient webClient;

    public AIController(OllamaChatModel chatModel) {
        this.chatModel = chatModel;
        this.webClient = WebClient.create("http://localhost:8082/");
    }

    @GetMapping("/ai/generate")
    public Map<String,String> generate(@RequestParam(value = "message", defaultValue = "Tell me a joke") String message) {
        return Map.of("generation", this.chatModel.call(message));
    }

    @GetMapping("/ai/generateStream")
    public Flux<String> generateStream(@RequestParam(value = "message", defaultValue = "Tell me a joke") String message) {
//        Prompt prompt = new Prompt(new UserMessage(message));
        Flux<String> response = chatModel.stream(message);
        return response;
    }

    @GetMapping("/ai/insights")
    public Map<String, String> generateInsights(@RequestParam String userId) {
        // Fetch transactions for the user
        List<Transaction> transactions = webClient
                .get()
                .uri("/transaction?userId=" + userId)
                .retrieve()
                .bodyToFlux(Transaction.class)
                .collectList()
                .block();

        // Use transactions to generate the prompt
        assert transactions != null;
        String prompt = buildPrompt(transactions);
        String insights = this.chatModel.call(prompt);
        return Map.of("insights", insights);
    }

    private String buildPrompt(List<Transaction> transactionData) {
        return "Analyze the following transaction data and provide insights: " + transactionData.toString();
    }
}

