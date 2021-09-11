package com.example.mediservapi.service;

import com.example.mediservapi.dto.model.request.CreateUpdateUserRequest;
import com.example.mediservapi.dto.model.user.CustomerDto;
import com.example.mediservapi.dto.model.user.UserDto;
import com.example.mediservapi.model.user.User;

import java.util.List;

public interface UserService {
    UserDto create(CreateUpdateUserRequest requestData);
    User signUp(CreateUpdateUserRequest requestData);
    UserDto findById(String id);
    UserDto updateProfile(String id, CreateUpdateUserRequest requestData);
    List<UserDto> findAll();
    UserDto findByEmail(String email);

    List<CustomerDto> findAllCustomers();
    CustomerDto findCustomerById(String id);
}
