package com.example.mediservapi.controller;

import com.example.mediservapi.dto.model.request.OrderRequest;
import com.example.mediservapi.dto.model.request.SearchRequest;
import com.example.mediservapi.dto.model.order.OrderDto;
import com.example.mediservapi.dto.model.order.OrderSearchQuery;
import com.example.mediservapi.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    @PreAuthorize("hasAuthority('PHARMACY_USER') or hasAuthority('SUPER_ADMIN')")
    public ResponseEntity<List<OrderDto>> getAll() {
        List<OrderDto> orders = orderService.findAll();
        return ResponseEntity.ok(orders);
    }

    @GetMapping(value = "/{id}")
    @PreAuthorize("hasAuthority('PHARMACY_USER') or hasAuthority('SUPER_ADMIN')")
    public ResponseEntity<OrderDto> getOrderById(@PathVariable String id) {
        OrderDto data = orderService.findById(id);
        return ResponseEntity.ok(data);
    }

    @PutMapping(value = "/{id}")
    @PreAuthorize("hasAuthority('PHARMACY_USER') or hasAuthority('SUPER_ADMIN')")
    public ResponseEntity<OrderDto> updateOrder(@PathVariable String id, @RequestBody @Valid OrderRequest request) {
        OrderDto data = orderService.updateOrder(id, request);
        return ResponseEntity.ok(data);
    }

    @PostMapping("search")
    @PreAuthorize("hasAuthority('PHARMACY_USER') or hasAuthority('SUPER_ADMIN')")
    public ResponseEntity<List<OrderDto>> search(@RequestBody @Valid SearchRequest<OrderSearchQuery> request) {
        List<OrderDto> orders = orderService.search(request.getPage(), request.getQuery());
        return ResponseEntity.ok(orders);
    }
}
