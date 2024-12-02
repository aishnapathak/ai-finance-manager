package com.finance.Transaction_service;

import com.finance.Transaction_service.external.UserServiceClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {

    @Autowired
    private UserServiceClient userServiceClient;

    @GetMapping("/validate/{userId}")
    public ResponseEntity<String> testUserValidation(@PathVariable Long userId) {
        boolean isValid = userServiceClient.isValidUser(userId);
        return ResponseEntity.ok("User validation result: " + isValid);
    }
}

