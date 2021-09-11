package com.example.mediservapi.dto.model.order;

import com.example.mediservapi.model.order.OrderStatus;
import com.example.mediservapi.model.order.PaymentMethod;
import lombok.Data;

@Data
public class OrderSearchQuery {
    private String id;
    private String customerId;
    private String pharmacyId;
    private PaymentMethod paymentMethod;
    private OrderStatus status;
}
