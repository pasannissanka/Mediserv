package com.example.mediservapi.controller;

import com.example.mediservapi.controller.request.CreateUpdateCustomerRequest;
import com.example.mediservapi.controller.request.CreateUpdateUserRequest;
import com.example.mediservapi.dto.response.Response;
import com.example.mediservapi.model.customer.Customer;
import com.example.mediservapi.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private CustomerService customerService;

    @PostMapping(value = "/")
    public Response saveNewCustomer(@RequestBody @Valid CreateUpdateCustomerRequest customer) {
        Customer data = customerService.signUp(customer);
        System.out.println(data);
        if (data == null) {
            return  Response.duplicateEntity().setErrors("Email already exist");
        }
        return Response.ok().setPayload(data);
    }
}
