package com.example.mediservapi.service;

import com.example.mediservapi.controller.request.CreateUpdateUserRequest;
import com.example.mediservapi.model.user.User;
import com.example.mediservapi.repository.pharmacy.PharmacyRepository;
import com.example.mediservapi.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PharmacyRepository pharmacyRepository;

    @Override
    public User signUp(CreateUpdateUserRequest userData) {
        Optional<User> user = userRepository.findByEmail(userData.getEmail());
        if (user.isEmpty()) {
            User newUser = new User()
                    .setEmail(userData.getEmail())
                    .setUserType(userData.getUserType())
                    .setAddress(userData.getAddress())
                    .setName(userData.getName());
            return userRepository.save(newUser);
        }
        return null;
    }


    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public Optional<User> findById(String id) {
        return userRepository.findById(id);
    }

    @Override
    public User updateProfile(String id, CreateUpdateUserRequest userData) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            user.get().setName(userData.getName()).setAddress(userData.getAddress());
            return userRepository.save(user.get());
        }
        return null;
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }
}
