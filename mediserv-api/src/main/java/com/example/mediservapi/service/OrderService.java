package com.example.mediservapi.service;

import com.example.mediservapi.controller.request.OrderRequest;
import com.example.mediservapi.dto.model.order.OrderDto;

import java.util.List;

public interface OrderService {
    OrderDto create(OrderRequest request);
    OrderDto updateOrder(String id, OrderRequest request);
    OrderDto findById(String id);
    List<OrderDto> findAll();
}
