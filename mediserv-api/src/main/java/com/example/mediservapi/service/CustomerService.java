package com.example.mediservapi.service;

import com.example.mediservapi.controller.request.CreateUpdateCustomerRequest;
import com.example.mediservapi.controller.request.CreateUpdateUserRequest;
import com.example.mediservapi.model.customer.Customer;
import com.example.mediservapi.model.user.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public interface CustomerService { // db ekata data danne
    Customer signUp(CreateUpdateCustomerRequest customerData);
    Optional<Customer> findByEmail(String email);
    Optional<Customer> findById(String id);
    Customer updateProfile(String id, CreateUpdateCustomerRequest userData);
    List<Customer> findAll();

}
