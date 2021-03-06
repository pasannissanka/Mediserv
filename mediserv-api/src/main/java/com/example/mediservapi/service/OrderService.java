package com.example.mediservapi.service;

import com.example.mediservapi.dto.model.request.OrderRequest;
import com.example.mediservapi.dto.model.request.Page;
import com.example.mediservapi.dto.model.order.OrderDto;
import com.example.mediservapi.dto.model.order.OrderSearchQuery;

import java.util.List;

public interface OrderService {
    OrderDto create(OrderRequest request);
    OrderDto updateOrder(String id, OrderRequest request);
    OrderDto findById(String id);
    List<OrderDto> findAll();
    List<OrderDto> search(Page page, OrderSearchQuery searchQuery);
}
