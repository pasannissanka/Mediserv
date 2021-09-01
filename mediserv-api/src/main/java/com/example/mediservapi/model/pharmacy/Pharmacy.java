package com.example.mediservapi.model.pharmacy;

import com.example.mediservapi.model.address.Address;
import lombok.Data;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Data
@Accessors(chain = true)
@Document("Pharmacies")
public class Pharmacy {
    @Id
    private String id;
    private String name;
    private String description;
    private Address address;
}
