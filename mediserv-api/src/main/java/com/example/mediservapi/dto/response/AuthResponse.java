package com.example.mediservapi.dto.response;

import com.example.mediservapi.dto.model.user.UserDto;
import com.example.mediservapi.model.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.Accessors;

@Data @Accessors(chain = true)
public class AuthResponse {
    private UserDto user;
    private String token;
    private String error;
}
