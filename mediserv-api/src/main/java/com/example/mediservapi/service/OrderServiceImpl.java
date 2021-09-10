package com.example.mediservapi.service;

import com.example.mediservapi.controller.request.OrderRequest;
import com.example.mediservapi.dto.mapper.OrderMapper;
import com.example.mediservapi.dto.model.order.OrderDto;
import com.example.mediservapi.model.order.Order;
import com.example.mediservapi.repository.order.OrderRepository;
import com.example.mediservapi.repository.pharmacy.PharmacyRepository;
import com.example.mediservapi.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.ValidationException;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PharmacyRepository pharmacyRepository;
    @Autowired
    private OrderMapper orderMapper;
    @Autowired
    private OrderRepository orderRepository;

    @Override
    public OrderDto create(OrderRequest request) {
        Order order = orderMapper.createOrder(request);
        order = orderRepository.save(order);
        return orderMapper.toOrderDto(order);
    }

    @Override
    public OrderDto updateOrder(String id, OrderRequest request) {
        Order order = orderRepository.findById(id).orElseThrow(
                () -> new ValidationException("Order id not found")
        );
        orderMapper.updateOrder(request, order);
        order = orderRepository.save(order);
        return orderMapper.toOrderDto(order);
    }

    @Override
    public OrderDto findById(String id) {
        Order order = orderRepository.findById(id).orElseThrow(
                () -> new ValidationException("Order id not found")
        );
        return orderMapper.toOrderDto(order);
    }

    @Override
    public List<OrderDto> findAll() {
        return orderMapper.toOrderDto(orderRepository.findAll());
    }
}
