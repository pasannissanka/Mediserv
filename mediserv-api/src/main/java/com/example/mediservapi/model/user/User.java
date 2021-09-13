package com.example.mediservapi.model.user;

import com.example.mediservapi.model.address.Address;
import lombok.Data;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Data
@Accessors(chain = true)
@Document(collection = "Users")
public class User implements UserDetails, Serializable {
    @Id
    private String id;

    @CreatedDate
    private Date createdAt;

    @LastModifiedDate
    private Date modifiedAt;

    @Indexed(unique = true)
    private String email;

    private String name;
    private Set<Role> authorities = new HashSet<>();
    private String password;

    private boolean enabled = true;

    // For customer
    private Address deliveryAddress;
    private Address billingAddress;


    public User() {
    }

    public User(String email, String password) {
        this.email = email;
        this.password = password;
        this.enabled = true;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return this.enabled;
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.enabled;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return this.enabled;
    }

    @Override
    public boolean isEnabled() {
        return this.enabled;
    }
}
