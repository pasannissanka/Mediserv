package com.example.mediservapi.service;

import com.example.mediservapi.dto.model.pharmacy.PharmacyDto;
import com.example.mediservapi.dto.model.user.SignUpData;
import com.example.mediservapi.dto.model.user.UserDto;
import com.example.mediservapi.model.pharmacy.Pharmacy;

import java.util.List;

public interface UserService {
    SignUpData signUp(UserDto userDto, Pharmacy pharmacy);
    UserDto findByEmail(String email);
    UserDto updateProfile(UserDto userDto);
    List<UserDto> findAll();
}
