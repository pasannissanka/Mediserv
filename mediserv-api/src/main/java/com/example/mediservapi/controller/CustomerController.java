package com.example.mediservapi.controller;

import com.example.mediservapi.service.CustomrService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private CustomrService customerService;

}
