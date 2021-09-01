package com.example.mediservapi.dto.model.pharmacy;

import com.example.mediservapi.model.address.Address;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class PharmacyDto {
    private String name;
    private String description;
    private Address address;
}
