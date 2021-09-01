package com.example.mediservapi.service;

import com.example.mediservapi.dto.model.pharmacy.PharmacyDto;

public interface PharmacyService {
    PharmacyDto createPharmacy(PharmacyDto pharmacyDto);
    PharmacyDto findOne(String id);
}
