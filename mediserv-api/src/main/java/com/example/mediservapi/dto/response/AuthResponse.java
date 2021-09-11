package com.example.mediservapi.dto.response;

import com.example.mediservapi.dto.model.user.UserDto;
import com.example.mediservapi.model.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data @AllArgsConstructor
public class AuthResponse {
    private UserDto user;
    private String token;
}
