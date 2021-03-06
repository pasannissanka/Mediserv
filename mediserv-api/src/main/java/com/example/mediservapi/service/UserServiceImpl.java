package com.example.mediservapi.service;

import com.example.mediservapi.dto.model.request.CreateUpdateUserRequest;
import com.example.mediservapi.dto.mapper.CustomerMapper;
import com.example.mediservapi.dto.mapper.UserMapper;
import com.example.mediservapi.dto.model.user.CustomerDto;
import com.example.mediservapi.dto.model.user.UserDto;
import com.example.mediservapi.model.user.User;
import com.example.mediservapi.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.ValidationException;
import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final CustomerMapper customerMapper;

    private Logger logger;

    @Override @Transactional
    public UserDto create(CreateUpdateUserRequest requestData) {
        if (userRepository.findByEmail(requestData.getEmail()).isPresent()) {
            throw new ValidationException("Email already exists");
        }
        if (!requestData.getPassword().equals(requestData.getRePassword())) {
            throw new ValidationException("Passwords don't match");
        }
        if (requestData.getAuthorities() == null) {
            requestData.setAuthorities(new HashSet<>());
        }
        User user = userMapper.createUser(requestData);
        user.setPassword(passwordEncoder.encode((requestData.getPassword())));
        user = userRepository.save(user);
        return userMapper.toUserDto(user);
    }


    @Override
    public UserDto findById(String id) {
        User user =  userRepository.findById(id).orElseThrow(
                () -> new ValidationException("User not found")
        );
        return userMapper.toUserDto(user);
    }

    @Override @Transactional
    public UserDto updateProfile(String id, CreateUpdateUserRequest requestData) {
        User user = userRepository.findById(id).orElseThrow(
                () -> new ValidationException("User id not found")
        );
        userMapper.updateUser(requestData, user);
        user = userRepository.save(user);
        return userMapper.toUserDto(user);
    }

    @Override
    public List<UserDto> findAll() {
        return userMapper.toUserDto(userRepository.findAll());
    }

    @Override
    public UserDto findByEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(
                () -> new ValidationException("User not found")
        );
        return userMapper.toUserDto(user);
    }

    @Override
    public List<CustomerDto> findAllCustomers() {
        return customerMapper.toCustomerDto(userRepository.findAllCustomers());
    }

    @Override
    public CustomerDto findCustomerById(String id) {
        return customerMapper.toCustomerDto(userRepository.findCustomerById(id).orElseThrow(
                () -> new ValidationException("Customer Id Not found")
        ));
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email).orElseThrow(
                () -> new UsernameNotFoundException("User with email: " + email + ", Not found")
        );
    }
}
