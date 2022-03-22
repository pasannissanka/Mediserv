package com.example.mediservapi.service;

import com.example.mediservapi.dto.model.pharmacy.PharmacyDto;
import com.example.mediservapi.dto.model.pharmacy.PharmacySearchQuery;
import com.example.mediservapi.dto.model.request.CreatePharmacyRequest;
import com.example.mediservapi.dto.model.request.Page;
import com.example.mediservapi.dto.model.request.UpdatePharmacyRequest;

import java.util.List;

public interface PharmacyService {
    PharmacyDto createNew(CreatePharmacyRequest pharmacyData);
    PharmacyDto findById(String id);
    PharmacyDto updatePharmacy(String id, UpdatePharmacyRequest pharmacyData);
    List<PharmacyDto> findAll();
    List<PharmacyDto> search(Page page, PharmacySearchQuery searchQuery);
    List<PharmacyDto> getUsersPharmacy (String adminId);
    Boolean isPharmacyBanner(String bannerId);
   }
