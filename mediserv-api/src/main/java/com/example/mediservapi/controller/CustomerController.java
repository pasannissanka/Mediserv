package com.example.mediservapi.controller;

import com.example.mediservapi.dto.model.user.CustomerDto;
import com.example.mediservapi.dto.model.user.UserDto;
import com.example.mediservapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<CustomerDto>> getAllUsers() {
        List<CustomerDto> data = userService.findAllCustomers();
        return ResponseEntity.ok(data);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<CustomerDto> getUserById(@PathVariable String id) {
        CustomerDto data = userService.findCustomerById(id);
        return ResponseEntity.ok(data);
    }
}
