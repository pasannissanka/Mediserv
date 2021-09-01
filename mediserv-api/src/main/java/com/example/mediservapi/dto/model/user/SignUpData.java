package com.example.mediservapi.dto.model.user;

import com.example.mediservapi.model.pharmacy.Pharmacy;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class SignUpData {
    private Pharmacy pharmacy;
    private UserDto user;
}
