package com.example.mediservapi.repository.order;

import com.example.mediservapi.dto.model.Page;
import com.example.mediservapi.dto.model.order.OrderSearchQuery;
import com.example.mediservapi.model.order.Order;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.TypedAggregation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;

public interface OrderRepository extends MongoRepository<Order, String>, OrderRepoCustom {
}

interface OrderRepoCustom {
    List<Order> searchOrders(Page page, OrderSearchQuery query);
}

@RequiredArgsConstructor
class OrderRepoCustomImpl implements OrderRepoCustom{
    private final MongoTemplate mongoTemplate;

    @Override
    public List<Order> searchOrders(Page page, OrderSearchQuery query) {
        List<AggregationOperation> operations = new ArrayList<>();

        List<Criteria> criteriaList = new ArrayList<>();
        if (StringUtils.hasText(query.getId())) {
            criteriaList.add(Criteria.where("id").is(query.getId()));
        }
        if (StringUtils.hasText(query.getCustomerId())) {
            criteriaList.add(Criteria.where("customer._id").is(query.getCustomerId()));
        }
        if (StringUtils.hasText(query.getPharmacyId())) {
            criteriaList.add(Criteria.where("pharmacy._id").is(query.getPharmacyId()));
        }
        if (query.getPaymentMethod() != null) {
            criteriaList.add(Criteria.where("paymentMethod").is(query.getPaymentMethod()));
        }
        if (query.getStatus() != null) {
            criteriaList.add(Criteria.where("status").is(query.getStatus()));
        }
        if (!criteriaList.isEmpty()) {
            Criteria orderCriteria = new Criteria().andOperator(criteriaList.toArray(new Criteria[0]));
            operations.add(match(orderCriteria));
        }

        operations.add(skip((page.getNumber() - 1) * page.getLimit()));
        operations.add(limit(page.getLimit()));
        TypedAggregation<Order> aggregation = newAggregation(Order.class, operations);
        AggregationResults<Order> results = mongoTemplate.aggregate(aggregation, Order.class);
        return results.getMappedResults();
    }
}