package com.finance.User_service;

import com.finance.User_service.dto.UserDTO;

import java.util.List;
import java.util.Optional;

public interface UserService {
    UserDTO createUser(UserDTO userDTO);
    Optional<UserDTO> getUserById(Long id);
    boolean validateUser(Long id);
    UserDTO updateUser(Long id, UserDTO userDTO);
    void deleteUser(Long id);
    List<UserDTO> getAllUsers();
    Optional<UserDTO> findByUsername(String username);
}
