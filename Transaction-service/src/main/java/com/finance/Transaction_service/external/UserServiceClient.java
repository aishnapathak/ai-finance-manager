package com.finance.Transaction_service.external;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@Service
public class UserServiceClient {

    @Value("${user-service.base-url}")
    private String userServiceBaseUrl;

    @Value("${user-service.auth.username}")
    private String username;

    @Value("${user-service.auth.password}")
    private String password;

    private final RestTemplate restTemplate;

    public UserServiceClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public boolean isValidUser(Long userId) {
        String url = userServiceBaseUrl + "/users/validate/" + userId;
        try {
            // Set authentication headers
            HttpHeaders headers = new HttpHeaders();
            headers.setBasicAuth(username, password); // Add Basic Authentication headers
            headers.setContentType(MediaType.APPLICATION_JSON);

            // Log the headers for debugging
            System.out.println("Authorization Header: " + headers.get("Authorization"));

            HttpEntity<String> entity = new HttpEntity<>(headers);

            // Make the HTTP GET request
            //ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            // Validate response
//            if (response.getStatusCode() == HttpStatus.OK && "true".equals(response.getBody())) {
//                return true;
//            } else {
//                throw new IllegalArgumentException("Invalid user ID: " + userId);
//            }
            return "true".equals(response.getBody());
        } catch (HttpClientErrorException e) {
            System.out.println("Error occurred while validating user: " + e.getMessage());
            if (e.getStatusCode() == HttpStatus.UNAUTHORIZED) {
                throw new IllegalArgumentException("User is not authorized for ID: " + userId);
            } else if (e.getStatusCode() == HttpStatus.NOT_FOUND) {
                throw new IllegalArgumentException("User not found for ID: " + userId);
            }
            throw new IllegalStateException("Error while validating user", e);
        }
    }

}

