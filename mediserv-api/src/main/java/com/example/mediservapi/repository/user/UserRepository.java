package com.example.mediservapi.repository.user;

import com.example.mediservapi.model.user.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String > {
    User findByEmail(String email);
}
