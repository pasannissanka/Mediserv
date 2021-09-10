package com.example.mediservapi.repository.order;

import com.example.mediservapi.model.order.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderRepository extends MongoRepository<Order, String> {
}
