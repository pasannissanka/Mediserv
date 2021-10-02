package com.example.mediservapi.model.order;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class OrderItems {
    private String name;
    private double count;
    private double unitPrice;
    private double total;
}
