package com.example.mediservapi.dto.model.order;

import com.example.mediservapi.model.order.OrderItems;
import com.example.mediservapi.model.order.OrderStatus;
import com.example.mediservapi.model.order.PaymentMethod;
import lombok.Data;


import java.util.List;

@Data
public class OrderDto {
    private String id;

    private String customerId;

    private String pharmacyId;

    private PaymentMethod paymentMethod;
    private String prescriptionImgUrl;
    private List<OrderItems> items;

    private double subTotal;
    private double shippingCost;
    private double tax;
    private double total;
    private OrderStatus status;
}
