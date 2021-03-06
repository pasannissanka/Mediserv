package com.example.mediservapi.dto.model.request;

import com.example.mediservapi.model.address.Address;
import lombok.Data;
import lombok.experimental.Accessors;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

@Data
@Accessors(chain = true)
public class UpdatePharmacyRequest {
    private String title;
    private String adminId;

    private Address address;

    private String description;

    private String contactNumber;
    private String email;
    private String bannerId;
}
