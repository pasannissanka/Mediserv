package com.example.mediservapi.repository.user;

import com.example.mediservapi.model.user.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String > {
    Optional<User> findByEmail(String email);

    @org.springframework.data.mongodb.repository.Query(value = "{ 'authorities': { $elemMatch: { 'authority' : 'REG_CUSTOMER' } }}")
    List<User> findAllCustomers();

    @org.springframework.data.mongodb.repository.Query(value = "{ 'authorities': { $elemMatch: { 'authority' : 'REG_CUSTOMER' } }, ?0}")
    List<User> findAllCustomers(Sort sort);

    @org.springframework.data.mongodb.repository.Query(value = "{ 'authorities': { $elemMatch: { 'authority' : 'REG_CUSTOMER' } }, 'id': ?0}")
    User findCustomerById(String id);
}
