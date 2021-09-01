package com.example.mediservapi.repository.pharmacy;

import com.example.mediservapi.model.pharmacy.Pharmacy;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PharmacyRepository extends MongoRepository<Pharmacy, String > {
}
