package com.example.mediservapi.model.user;

import com.example.mediservapi.model.address.Address;
import com.example.mediservapi.model.pharmacy.Pharmacy;
import lombok.Data;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.IndexDirection;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Accessors(chain = true)
@Document(collection = "Users")
public class User {
    @Id
    private String id;

    private String name;

    @Indexed(unique = true, direction = IndexDirection.DESCENDING)
    private String email;

    private AdminType userType;
    private Address address;
}
