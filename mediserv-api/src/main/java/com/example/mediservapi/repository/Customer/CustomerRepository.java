package com.example.mediservapi.repository.Customer;

import com.example.mediservapi.model.customer.Customer;
import com.example.mediservapi.model.user.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CustomerRepository extends MongoRepository<Customer,String> {  //genric, data type of student id
    Optional<Customer> findByEmail(String email);
}
