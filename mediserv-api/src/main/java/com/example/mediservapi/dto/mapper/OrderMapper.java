package com.example.mediservapi.dto.mapper;

import com.example.mediservapi.dto.model.request.OrderRequest;
import com.example.mediservapi.dto.model.order.OrderDto;
import com.example.mediservapi.model.order.Order;
import com.example.mediservapi.model.pharmacy.Pharmacy;
import com.example.mediservapi.model.user.User;
import com.example.mediservapi.repository.order.OrderRepository;
import com.example.mediservapi.repository.pharmacy.PharmacyRepository;
import com.example.mediservapi.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.validation.ValidationException;
import java.util.ArrayList;
import java.util.List;

@Component
public class OrderMapper {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private PharmacyRepository pharmacyRepository;
    @Autowired
    private CustomerMapper customerMapper;

    public Order createOrder(OrderRequest request) {
        if (request == null) {
            return null;
        }

        User customer = userRepository.findCustomerById(request.getCustomerId()).orElseThrow(
                () -> new ValidationException("Customer id not found")
        );

        Pharmacy pharmacy = pharmacyRepository.findById(request.getPharmacyId()).orElseThrow(
                () -> new ValidationException("Pharmacy id not found")
        );

        return new Order()
                .setDeliveryAddress(request.getDeliveryAddress())
                .setPrescriptionImgUrl(request.getPrescriptionImgUrl())
                .setPaymentMethod(request.getPaymentMethod())
                .setSubTotal(request.getSubTotal())
                .setShippingCost(request.getShippingCost())
                .setTax(request.getTax())
                .setStatus(request.getStatus())
                .setPharmacy(pharmacy)
                .setCustomer(customer);
    }

    public void updateOrder(OrderRequest request, Order order) {
        if (request == null) {
            return;
        }
        if (request.getDeliveryAddress() != null) {
            order.setDeliveryAddress(request.getDeliveryAddress());
        }
        if (request.getStatus() != null) {
            order.setStatus(request.getStatus());
        }
        if (request.getItems() != null) {
            order.setItems(request.getItems());
        }
        if (request.getSubTotal() != order.getSubTotal()) {
            order.setSubTotal(request.getSubTotal());
        }
        if (request.getShippingCost() != order.getShippingCost()) {
            order.setShippingCost(request.getShippingCost());
        }
        if (request.getTax() != order.getTax()) {
            order.setTax(request.getTax());
        }
        if (request.getTotal() != order.getTax()) {
            order.setTax(request.getTax());
        }

    }

    public OrderDto toOrderDto(Order order) {
        if (order == null) {
            return null;
        }

        return new OrderDto()
                .setId(order.getId())
                .setDeliveryAddress(order.getDeliveryAddress())
                .setPrescriptionImgUrl(order.getPrescriptionImgUrl())
                .setPaymentMethod(order.getPaymentMethod())
                .setSubTotal(order.getSubTotal())
                .setShippingCost(order.getShippingCost())
                .setTax(order.getTax())
                .setStatus(order.getStatus())
                .setItems(order.getItems())
                .setPharmacyId(order.getPharmacy().getId())
                .setCustomer(customerMapper.toCustomerDto(order.getCustomer()))
                .setCreatedAt(order.getCreatedAt())
                .setModifiedAt(order.getModifiedAt());
    }

    public List<OrderDto> toOrderDto(List<Order> orders) {
        if (orders == null) {
            return null;
        }

        List<OrderDto> list = new ArrayList<OrderDto>(orders.size());

        for (Order order: orders) {
            list.add(this.toOrderDto(order));
        }

        return list;
    }
}
