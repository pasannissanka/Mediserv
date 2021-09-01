package com.example.mediservapi.service;

import com.example.mediservapi.dto.model.pharmacy.PharmacyDto;
import com.example.mediservapi.repository.pharmacy.PharmacyRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class PharmacyServiceImpl implements PharmacyService {

    @Autowired
    private PharmacyRepository pharmacyRepository;

    @Override
    public PharmacyDto createPharmacy(PharmacyDto pharmacyDto) {
        return null;
    }

    @Override
    public PharmacyDto findOne(String id) {
        return null;
    }
}
