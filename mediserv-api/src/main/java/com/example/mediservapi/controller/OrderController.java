package com.example.mediservapi.controller;

import com.example.mediservapi.controller.request.OrderRequest;
import com.example.mediservapi.dto.model.order.OrderDto;
import com.example.mediservapi.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderDto> create(@RequestBody @Valid OrderRequest request) {
        OrderDto order = orderService.create(request);
        return ResponseEntity.ok(order);
    }

    @GetMapping
    public ResponseEntity<List<OrderDto>> getAll() {
        List<OrderDto> orders = orderService.findAll();
        return ResponseEntity.ok(orders);
    }
}
