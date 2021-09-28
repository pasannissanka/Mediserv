package com.example.mediservapi.service;

import com.example.mediservapi.dto.model.order.OrderDto;
import com.example.mediservapi.dto.model.order.OrderSearchQuery;
import com.example.mediservapi.dto.model.pharmacy.PharmacySearchQuery;
import com.example.mediservapi.dto.model.request.CreateUpdatePharmacyRequest;
import com.example.mediservapi.dto.model.request.Page;
import com.example.mediservapi.model.pharmacy.Pharmacy;

import java.util.List;
import java.util.Optional;

public interface PharmacyService {
    Pharmacy createNew(CreateUpdatePharmacyRequest pharmacyData);
    Optional<Pharmacy> findById(String id);
    Pharmacy updatePharmacy(String id, CreateUpdatePharmacyRequest pharmacyData);
    List<Pharmacy> findAll();
    List<Pharmacy> search(Page page, PharmacySearchQuery searchQuery);
   }
