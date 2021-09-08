package com.example.mediservapi.service;

import com.example.mediservapi.controller.request.CreateUpdatePharmacyRequest;
import com.example.mediservapi.controller.request.CreateUpdateUserRequest;
import com.example.mediservapi.dto.model.pharmacy.PharmacyDto;
import com.example.mediservapi.model.pharmacy.Pharmacy;
import com.example.mediservapi.model.user.User;

import java.util.List;
import java.util.Optional;

public interface PharmacyService {
    Pharmacy signUp(CreateUpdatePharmacyRequest pharmacyData);
    Optional<Pharmacy>  findByEmail(String email);
    Optional<Pharmacy> findById(String id);
    Pharmacy updatePharmacy(String id, CreateUpdatePharmacyRequest pharmacyData);
    List<Pharmacy> findAll();
   }
