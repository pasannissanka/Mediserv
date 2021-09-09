package com.example.mediservapi.controller.request;

import com.example.mediservapi.model.address.Address;
import lombok.Data;
import lombok.experimental.Accessors;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.Set;

@Data
@Accessors(chain = true)
public class CreateUpdateUserRequest {

    @NotBlank
    private String name;

    @NotBlank @Email
    private String email;

    @NotBlank
    private String password;

    @NotBlank
    private String rePassword;

    private Set<String> authorities;

    // For customer
    private Address deliveryAddress;
    private Address billingAddress;
}
