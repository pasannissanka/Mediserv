package com.example.mediservapi.dto.model.request;

import com.example.mediservapi.model.address.Address;
import com.example.mediservapi.model.order.OrderItems;
import com.example.mediservapi.model.order.OrderStatus;
import com.example.mediservapi.model.order.PaymentMethod;
import lombok.Data;
import org.jetbrains.annotations.NotNull;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Data
public class OrderRequest {
    @NotNull @NotBlank
    private String customerId;
    private Address deliveryAddress;
    @NotNull @NotBlank
    private String pharmacyId;

    private PaymentMethod paymentMethod;

    private String prescriptionImgUrl;

    private List<OrderItems> items;

    private double subTotal;
    private double shippingCost;
    private double tax;
    private double total;

    private String status;
}
