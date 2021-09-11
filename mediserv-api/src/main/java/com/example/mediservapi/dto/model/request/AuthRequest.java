package com.example.mediservapi.dto.model.request;

import lombok.Data;
import org.jetbrains.annotations.NotNull;

import javax.validation.constraints.Email;

@Data
public class AuthRequest {
    @NotNull
    @Email
    private String email;
    @NotNull
    private String password;
}
