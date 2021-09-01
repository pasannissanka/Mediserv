package com.example.mediservapi.model.order;

import com.example.mediservapi.model.customer.Customer;
import com.example.mediservapi.model.pharmacy.Pharmacy;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "Orders")
public class Order {
    @Id
    private String id;

    @DBRef
    private Customer customer;

    @DBRef
    private Pharmacy pharmacy;

    private PaymentMethod paymentMethod;
    private String prescriptionImgUrl;
    private List<OrderItems> items;

    private double subTotal;
    private double shippingCost;
    private double tax;
    private double total;
    private OrderStatus status;
}
