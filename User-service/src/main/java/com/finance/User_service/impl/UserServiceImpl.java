package com.finance.User_service.impl;

import com.finance.User_service.User;
import com.finance.User_service.UserRepository;
import com.finance.User_service.UserService;
import com.finance.User_service.dto.UserDTO;
import com.finance.User_service.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
}
