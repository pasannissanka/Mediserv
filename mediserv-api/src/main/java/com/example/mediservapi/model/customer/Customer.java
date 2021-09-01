package com.example.mediservapi.model.customer;

import com.example.mediservapi.model.address.Address;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.IndexDirection;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "Customers")
public class Customer {

    @Id
    private String id;
    private String name;
    @Indexed(unique = true, direction = IndexDirection.DESCENDING)
    private String email;
    private Address deliveryAddress;
    private Address billingAddress;

}
