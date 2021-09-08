package com.example.mediservapi.service;

import com.example.mediservapi.controller.request.CreateUpdateCustomerRequest;
import com.example.mediservapi.model.customer.Customer;
import com.example.mediservapi.repository.Customer.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Component
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;


    @Override
    public Customer signUp(CreateUpdateCustomerRequest customerData) {
        Optional<Customer> customer = customerRepository.findByEmail(customerData.getEmail());
        if (customer.isEmpty()) {
            Customer newCustomer = new Customer()
                    .setName(customerData.getName())
                    .setEmail(customerData.getEmail())
                    .setBillingAddress(customerData.getBillingAddress())
                    .setDeliveryAddress(customerData.getDeliveryAddress()); // create new customer
            return customerRepository.save(newCustomer);
        }
        return null;
    }

    @Override
    public Optional<Customer> findByEmail(String email) {
        return customerRepository.findByEmail(email);
    }

    @Override
    public Optional<Customer> findById(String id) {
        return customerRepository.findById(id);
    }

    @Override
    public Customer updateProfile(String id, CreateUpdateCustomerRequest customerData) {
        Optional<Customer> customer = customerRepository.findById(id);
        if (customer.isPresent()) {
            customer.get()
                    .setName(customerData.getName())
                    .setEmail(customerData.getEmail())
                    .setBillingAddress(customerData.getBillingAddress())
                    .setDeliveryAddress(customerData.getDeliveryAddress());
            return customerRepository.save(customer.get());
        }
        return null;
    }

    @Override
    public List<Customer> findAll() {
        return customerRepository.findAll();
    }
}
