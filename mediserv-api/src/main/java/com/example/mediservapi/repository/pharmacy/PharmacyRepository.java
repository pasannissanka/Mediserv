package com.example.mediservapi.repository.pharmacy;

import com.example.mediservapi.dto.mapper.PharmacyMapper;
import com.example.mediservapi.dto.model.pharmacy.PharmacySearchQuery;
import com.example.mediservapi.dto.model.request.Page;
import com.example.mediservapi.model.pharmacy.Pharmacy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.TypedAggregation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;

public interface PharmacyRepository extends MongoRepository<Pharmacy, String>, PharmacyRepoCustom {
}

interface PharmacyRepoCustom {
    List<Pharmacy> searchPharmacy(Page page, PharmacySearchQuery query);
    List<Pharmacy> findPharmacyByAdminId(String adminId);
}

class PharmacyRepoCustomImpl implements PharmacyRepoCustom {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public List<Pharmacy> searchPharmacy(Page page, PharmacySearchQuery query) {
        List<AggregationOperation> operations = new ArrayList<>();

        List<Criteria> criteriaList = new ArrayList<>();
        if (StringUtils.hasText(query.getId())) {
            criteriaList.add(Criteria.where("id").is(query.getId()));
        }
        if (StringUtils.hasText(query.getTitle())) {
            criteriaList.add(Criteria.where("title").regex(query.getTitle()));
        }

        if (!criteriaList.isEmpty()) {
            Criteria pharmacyCriteria = new Criteria().andOperator(criteriaList.toArray(new Criteria[0]));
            operations.add(match(pharmacyCriteria));
        }
        operations.add(skip((page.getNumber() - 1) * page.getLimit()));
        operations.add(limit(page.getLimit()));
        TypedAggregation<Pharmacy> aggregation = newAggregation(Pharmacy.class, operations);
        AggregationResults<Pharmacy> results = mongoTemplate.aggregate(aggregation, Pharmacy.class);
        return results.getMappedResults();

    }

    @Override
    public List<Pharmacy> findPharmacyByAdminId(String adminId) {
        Query query = new Query();
        query.addCriteria(Criteria.where("adminIds").is(adminId));
        return mongoTemplate.find(query, Pharmacy.class);
    }
}