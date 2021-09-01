package com.example.mediservapi.dto.mapper;

import com.example.mediservapi.dto.model.pharmacy.PharmacyDto;
import com.example.mediservapi.dto.model.user.UserDto;
import com.example.mediservapi.model.user.User;

import java.util.stream.Collectors;

public class UserMapper {
    public static UserDto toUserDto(User user) {
        return new UserDto()
                .setName(user.getName())
                .setAddress(user.getAddress())
                .setUserType(user.getUserType())
                .setEmail(user.getEmail())
                .setPharmacy(user.getPharmacy().getId());
    }
}
