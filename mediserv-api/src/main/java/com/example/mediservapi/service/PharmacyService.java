package com.example.mediservapi.service;

import com.example.mediservapi.dto.model.order.OrderDto;
import com.example.mediservapi.dto.model.order.OrderSearchQuery;
import com.example.mediservapi.dto.model.pharmacy.PharmacyDto;
import com.example.mediservapi.dto.model.pharmacy.PharmacySearchQuery;
import com.example.mediservapi.dto.model.request.CreatePharmacyRequest;
import com.example.mediservapi.dto.model.request.Page;
import com.example.mediservapi.dto.model.request.UpdatePharmacyRequest;
import com.example.mediservapi.model.pharmacy.Pharmacy;

import java.util.List;
import java.util.Optional;

public interface PharmacyService {
    PharmacyDto createNew(CreatePharmacyRequest pharmacyData);
    PharmacyDto findById(String id);
    PharmacyDto updatePharmacy(String id, UpdatePharmacyRequest pharmacyData);
    List<PharmacyDto> findAll();
    List<PharmacyDto> search(Page page, PharmacySearchQuery searchQuery);
    List<PharmacyDto> getUsersPharmacy (String adminId);
    Boolean isPharmacyBanner(String bannerId);
   }
