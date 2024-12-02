package com.finance.Transaction_service.config;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;

@Configuration
public class RestTemplateConfig {

    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder,
                                     @Value("${user-service.auth.username}") String username,
                                     @Value("${user-service.auth.password}") String password) {
        return builder.basicAuthentication(username, password).build();
    }
}

