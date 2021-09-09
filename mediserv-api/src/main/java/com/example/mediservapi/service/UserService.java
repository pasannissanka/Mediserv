package com.example.mediservapi.service;

import com.example.mediservapi.controller.request.CreateUpdateUserRequest;
import com.example.mediservapi.dto.model.user.CustomerDto;
import com.example.mediservapi.dto.model.user.UserDto;
import com.example.mediservapi.model.user.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    UserDto create(CreateUpdateUserRequest requestData);
    User signUp(CreateUpdateUserRequest requestData);
    UserDto findById(String id);
    UserDto updateProfile(String id, CreateUpdateUserRequest requestData);
    List<UserDto> findAll();

    List<CustomerDto> findAllCustomers();
    CustomerDto findCustomerById(String id);
}
