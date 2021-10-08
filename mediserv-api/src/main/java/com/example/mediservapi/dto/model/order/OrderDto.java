package com.example.mediservapi.dto.model.order;

import com.example.mediservapi.dto.model.pharmacy.PharmacyDto;
import com.example.mediservapi.dto.model.user.CustomerDto;
import com.example.mediservapi.model.address.Address;
import com.example.mediservapi.model.order.OrderItems;
import com.example.mediservapi.model.order.OrderStatus;
import com.example.mediservapi.model.order.PaymentMethod;
import lombok.Data;
import lombok.experimental.Accessors;


import java.util.Date;
import java.util.List;

//data transfer objects
@Data
@Accessors(chain = true)
public class OrderDto {
    private String id;

    private CustomerDto customer;
    private PharmacyDto pharmacy;

    private Address deliveryAddress;

    private PaymentMethod paymentMethod;
    private String prescriptionImgUrl;
    private List<OrderItems> items;

    private double subTotal;
    private double shippingCost;
    private double tax;
    private double total;
    private OrderStatus status;

    private Date createdAt;
    private Date modifiedAt;
}
