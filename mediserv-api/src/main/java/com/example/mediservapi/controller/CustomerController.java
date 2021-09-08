package com.example.mediservapi.controller;

import com.example.mediservapi.controller.request.CreateUpdateCustomerRequest;
import com.example.mediservapi.controller.request.CreateUpdateUserRequest;
import com.example.mediservapi.dto.response.Response;
import com.example.mediservapi.model.customer.Customer;
import com.example.mediservapi.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @PostMapping(value = "/")
    public Response saveNewCustomer (@RequestBody @Valid CreateUpdateCustomerRequest customer) {
        Customer customerData = customerService.signUp(customer);
        System.out.println(customerData);
        if(customerData == null ) {
            return Response.duplicateEntity().setErrors("Email already exists");
        }
        return Response.ok().setPayload(customerData);
    }

    @PutMapping(value = "/{id}")
    public Response updateCustomer(@PathVariable String id, @RequestBody CreateUpdateCustomerRequest customer) {
        Customer customerData = customerService.updateProfile(id,customer);
        System.out.println(customerData);
        if(customerData == null) {
            return Response.duplicateEntity().setErrors("Customer not found for update!");
        }
        return Response.ok().setPayload(customerData);
    }

    @GetMapping(value = "/")
    public Response getAllCustomers() {
        List<Customer> customerData = customerService.findAll();
        if (customerData == null) {
            return Response.notFound().setErrors("No data found!");
        }
        return Response.ok().setPayload(customerData);
    }

    @GetMapping(value = "/id/{id}")
    public Response getCustomerByID(@PathVariable String id) {
        Optional<Customer> customerData = customerService.findById(id);
        if (customerData.isEmpty()) {
            return Response.notFound().setErrors("Customer not found!");
        }
        return Response.ok().setPayload(customerData);
    }



}
