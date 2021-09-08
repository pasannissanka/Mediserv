package com.example.mediservapi.repository.pharmacy;

import com.example.mediservapi.model.pharmacy.Pharmacy;
import com.example.mediservapi.model.user.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface PharmacyRepository extends MongoRepository<Pharmacy, String > { }
