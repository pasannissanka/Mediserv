package com.example.mediservapi.model.pharmacy;

import com.example.mediservapi.model.address.Address;
import lombok.Data;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;


@Data
@Accessors(chain = true)
@Document(collection = "Pharmacies")

public class Pharmacy {
    @Id
    private String id;
    private String title;
    private String description;
    private Address address;

    @CreatedDate
    private Date createdAt;

    @LastModifiedDate
    private Date modifiedAt;

    private Set<String> adminIds = new HashSet<>();
}
