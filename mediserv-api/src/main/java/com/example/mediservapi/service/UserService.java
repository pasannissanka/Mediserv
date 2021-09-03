package com.example.mediservapi.service;

import com.example.mediservapi.controller.request.CreateUpdateUserRequest;
import com.example.mediservapi.model.user.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User signUp(CreateUpdateUserRequest userData);
    Optional<User>  findByEmail(String email);
    Optional<User> findById(String id);
    User updateProfile(String id, CreateUpdateUserRequest userData);
    List<User> findAll();
}
