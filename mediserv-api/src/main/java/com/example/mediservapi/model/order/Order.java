package com.example.mediservapi.model.order;

import com.example.mediservapi.model.address.Address;
import com.example.mediservapi.model.pharmacy.Pharmacy;
import com.example.mediservapi.model.user.User;
import lombok.Data;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

@Data
@Accessors(chain = true)
@Document(collection = "Orders")
public class Order {
    @Id
    private String id;

    @DBRef
    private User customer;
    private Address deliveryAddress;

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

    @CreatedDate
    private Date createdAt;

    @LastModifiedDate
    private Date modifiedAt;
}
