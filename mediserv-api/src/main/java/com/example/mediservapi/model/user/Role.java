package com.example.mediservapi.model.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

@Data @AllArgsConstructor @NoArgsConstructor
public class Role implements GrantedAuthority {
    public static final String SUPER_ADMIN = "SUPER_ADMIN";
    public static final String PHARMACY_USER = "PHARMACY_USER";
    public static final String REG_CUSTOMER = "REG_CUSTOMER";

    private String authority;

    @Override
    public String toString() {
        return authority;
    }
}
