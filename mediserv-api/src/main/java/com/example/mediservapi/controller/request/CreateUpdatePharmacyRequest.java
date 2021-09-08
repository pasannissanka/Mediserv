package com.example.mediservapi.controller.request;

import com.example.mediservapi.model.address.Address;
import lombok.Data;
import lombok.experimental.Accessors;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;


@Data
@Accessors(chain = true)
public class CreateUpdatePharmacyRequest {
    @NotBlank
    @NotEmpty
    private String title;

    private Address address;

    private String description;


}
