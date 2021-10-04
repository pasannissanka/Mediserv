package com.example.mediservapi.dto.model.pharmacy;

import com.example.mediservapi.model.address.Address;
import lombok.Data;
import lombok.experimental.Accessors;

//data transfer objects
@Data
@Accessors(chain = true)
public class PharmacyDto {
    private String id;
    private String title;
    private String description;
    private Address address;
}
