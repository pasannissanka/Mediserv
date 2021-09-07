package com.example.mediservapi.repository.user;

import com.example.mediservapi.model.user.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String > {
    Optional<User> findByEmail(String email);
}
