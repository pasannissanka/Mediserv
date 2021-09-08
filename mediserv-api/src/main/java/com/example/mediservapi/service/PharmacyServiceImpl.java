package com.example.mediservapi.service;

import com.example.mediservapi.controller.request.CreateUpdatePharmacyRequest;
import com.example.mediservapi.controller.request.CreateUpdateUserRequest;
import com.example.mediservapi.dto.model.pharmacy.PharmacyDto;
import com.example.mediservapi.model.pharmacy.Pharmacy;
import com.example.mediservapi.model.user.User;
import com.example.mediservapi.repository.pharmacy.PharmacyRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class PharmacyServiceImpl implements PharmacyService {

    @Autowired
    private PharmacyRepository pharmacyRepository;

    @Override
    public Pharmacy signUp(CreateUpdatePharmacyRequest pharmacyData) {
        Optional<Pharmacy> pharmacy = pharmacyRepository.findByEmail(pharmacyData.getEmail());
        if(pharmacy.isEmpty()) {
            Pharmacy newPharmacy = new Pharmacy()
                    .setName(pharmacyData.getName())
                    .setEmail(pharmacyData.getEmail())
                    .setAddress(pharmacyData.getAddress())
                    .setDescription(pharmacyData.getDescription());
            return pharmacyRepository.save(newPharmacy);
        }
        return null;
    }

    @Override
    public Optional<Pharmacy> findByEmail(String email) {
        return pharmacyRepository.findByEmail(email);
    }

    @Override
    public Optional<Pharmacy> findById(String id) {
        return pharmacyRepository.findById(id);
    }

    @Override
    public Pharmacy updatePharmacy(String id, CreateUpdatePharmacyRequest pharmacyData) {
        Optional<Pharmacy> pharmacy = pharmacyRepository.findById(id);
        if (pharmacy.isPresent()) {
            pharmacy.get()
                    .setName(pharmacyData.getName())
                    .setEmail(pharmacyData.getEmail())
                    .setAddress(pharmacyData.getAddress())
                    .setDescription(pharmacyData.getDescription());
            return pharmacyRepository.save(pharmacy.get());
        }
        return null;
    }

    @Override
    public List<Pharmacy> findAll() {
        return pharmacyRepository.findAll();
    }
}
