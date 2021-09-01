package com.example.mediservapi.model.address;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class Address {
    private String houseNo;
    private String lineOne;
    private String lineTwo;
    private String province;
    private String district;
    private String town;
    private double longitude;
    private double latitude;
}
