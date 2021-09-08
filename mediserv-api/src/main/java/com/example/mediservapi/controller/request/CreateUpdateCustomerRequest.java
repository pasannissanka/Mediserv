package com.example.mediservapi.controller.request;

import com.example.mediservapi.model.address.Address;
import com.example.mediservapi.model.user.AdminType;
import lombok.Data;
import lombok.experimental.Accessors;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

@Data
@Accessors(chain = true)
public class CreateUpdateCustomerRequest {
    @NotBlank
    @NotEmpty
    private String name;

    @NotBlank
    @Email
    private String email;

    private Address deliveryAddress;

    private Address billingAddress;

}
