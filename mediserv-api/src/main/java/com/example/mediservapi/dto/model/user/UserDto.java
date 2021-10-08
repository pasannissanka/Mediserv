package com.example.mediservapi.dto.model.user;

import com.example.mediservapi.model.address.Address;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
public class UserDto {
    private String id;

    private String email;
    private String name;
    private Set<String> authorities;

    private List<String> pharmacies;
}
