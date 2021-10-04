package com.example.mediservapi.service;

import com.example.mediservapi.dto.mapper.PharmacyMapper;
import com.example.mediservapi.dto.model.pharmacy.PharmacyDto;
import com.example.mediservapi.dto.model.pharmacy.PharmacySearchQuery;
import com.example.mediservapi.dto.model.request.CreatePharmacyRequest;
import com.example.mediservapi.dto.model.request.Page;
import com.example.mediservapi.dto.model.request.UpdatePharmacyRequest;
import com.example.mediservapi.model.pharmacy.Pharmacy;
import com.example.mediservapi.model.user.User;
import com.example.mediservapi.repository.pharmacy.PharmacyRepository;
import com.example.mediservapi.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.validation.ValidationException;
import java.util.List;

@Component
public class PharmacyServiceImpl implements PharmacyService {

    @Autowired
    private PharmacyRepository pharmacyRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PharmacyMapper pharmacyMapper;

    @Override
    public PharmacyDto createNew(CreatePharmacyRequest pharmacyData) {
        Pharmacy pharmacy = pharmacyMapper.createPharmacy(pharmacyData);
        return pharmacyMapper.toPharmacyDto(pharmacyRepository.save(pharmacy));
    }

    @Override
    public PharmacyDto findById(String id) {
        return pharmacyMapper.toPharmacyDto(pharmacyRepository.findById(id).orElseThrow(
                () -> new ValidationException("Pharmacy not found")
        ));
    }

    @Override
    public PharmacyDto updatePharmacy(String id, UpdatePharmacyRequest pharmacyData) {
        Pharmacy pharmacy = pharmacyRepository.findById(id).orElseThrow(
                () -> new ValidationException("Pharmacy not found")
        );
        pharmacyMapper.updatePharmacy(pharmacyData, pharmacy);
        pharmacy = pharmacyRepository.save(pharmacy);
        return pharmacyMapper.toPharmacyDto(pharmacy);
    }

    @Override
    public List<PharmacyDto> findAll() {
        return pharmacyMapper.toPharmacyDto(pharmacyRepository.findAll());
    }

    @Override
    public List<PharmacyDto> search(Page page, PharmacySearchQuery searchQuery) {
        return pharmacyMapper.toPharmacyDto(pharmacyRepository.searchPharmacy(page, searchQuery));
    }

    @Override
    public List<PharmacyDto> getUsersPharmacy(String username) {
        User admin = userRepository.findByEmail(username).orElseThrow(
                () -> new ValidationException("Admin not found")
        );
        List<Pharmacy> pharmacies = pharmacyRepository.findPharmacyByAdminId(admin.getId());
        return pharmacyMapper.toPharmacyDto(pharmacies);
    }
}
