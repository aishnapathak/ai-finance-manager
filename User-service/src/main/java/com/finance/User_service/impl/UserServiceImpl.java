package com.finance.User_service.impl;

import com.finance.User_service.User;
import com.finance.User_service.UserRepository;
import com.finance.User_service.UserService;
import com.finance.User_service.dto.UserDTO;
import com.finance.User_service.exception.ResourceNotFoundException;
import com.finance.User_service.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper = UserMapper.INSTANCE;

    @Override
    public UserDTO createUser(UserDTO userDTO) {
        User user = userMapper.toEntity(userDTO);
        user = userRepository.save(user);
        return userMapper.toDTO(user);
    }

    @Override
    public Optional<UserDTO> getUserById(Long id) {
        return userRepository.findById(id).map(userMapper::toDTO);
    }

    @Override
    public boolean validateUser(Long id) {
        return userRepository.existsById(id);
    }

    @Override
    public UserDTO updateUser(Long id, UserDTO userDTO) {
        // Retrieve the existing user
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));

        // Update the entity with new values from the DTO
        if (userDTO.getFullName() != null) {
            existingUser.setFullName(userDTO.getFullName());
        }
        if (userDTO.getEmail() != null) {
            existingUser.setEmail(userDTO.getEmail());
        }
        if (userDTO.getUsername() != null) {
            existingUser.setUsername(userDTO.getUsername());
        }
        if (userDTO.getPhoneNumber() != null) {
            existingUser.setPhoneNumber(userDTO.getPhoneNumber());
        }

        // Save the updated entity
        User updatedUser = userRepository.save(existingUser);

        // Convert updated entity back to DTO
        return userMapper.toDTO(updatedUser);
    }


    @Override
    public void deleteUser(Long id) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));
        userRepository.delete(existingUser);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(userMapper::toDTO).toList();
    }

    @Override
    public Optional<UserDTO> findByUsername(String username) {
        return userRepository.findByUsername(username).map(userMapper::toDTO);
    }
}
