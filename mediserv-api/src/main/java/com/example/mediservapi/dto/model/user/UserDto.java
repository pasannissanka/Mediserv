package com.example.mediservapi.dto.model.user;

import com.example.mediservapi.dto.model.pharmacy.PharmacyDto;
import com.example.mediservapi.model.address.Address;
import com.example.mediservapi.model.user.AdminType;
import lombok.Data;
import lombok.experimental.Accessors;

import java.util.List;

@Data
@Accessors(chain = true)
public class UserDto {
    private String id;
    private String name;
    private String email;
    private AdminType userType;
    private Address address;
    private String pharmacy;
}
