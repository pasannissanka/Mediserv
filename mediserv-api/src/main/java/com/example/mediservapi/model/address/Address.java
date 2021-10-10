package com.example.mediservapi.model.address;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class Address {
    private String lineOne;
    private String province;
    private String district;

    private double longitude;
    private double latitude;
}
