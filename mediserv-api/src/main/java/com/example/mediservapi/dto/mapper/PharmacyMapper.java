package com.example.mediservapi.dto.mapper;

import com.example.mediservapi.dto.model.pharmacy.PharmacyDto;
import com.example.mediservapi.dto.model.request.CreatePharmacyRequest;
import com.example.mediservapi.dto.model.request.UpdatePharmacyRequest;
import com.example.mediservapi.model.pharmacy.Pharmacy;
import com.example.mediservapi.model.user.Role;
import com.example.mediservapi.model.user.User;
import com.example.mediservapi.repository.pharmacy.PharmacyRepository;
import com.example.mediservapi.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.validation.ValidationException;
import java.util.*;

@Component
public class PharmacyMapper {

    @Autowired
    private PharmacyRepository pharmacyRepository;
    @Autowired
    private UserRepository userRepository;

    public Pharmacy createPharmacy(CreatePharmacyRequest request) {
        if (request == null) {
            return null;
        }

        if (request.getAdminId().isEmpty()) {
            return null;
        }

        User admin = userRepository.findById(request.getAdminId()).orElseThrow(
                () -> new ValidationException("Admin id not found")
        );

        Role adminRole = new Role(Role.PHARMACY_USER);
        Set<String> adminIds = new HashSet<>();

        if (!admin.getAuthorities().contains(adminRole)) {
            return null;
        }
        adminIds.add(admin.getId());

        return new Pharmacy()
                .setTitle(request.getTitle())
                .setAddress(request.getAddress())
                .setAdminIds(adminIds)
                .setDescription(request.getDescription());
    }

    public void updatePharmacy(UpdatePharmacyRequest request, Pharmacy pharmacy) {
        if (request == null) {
            return;
        }
        if (request.getTitle() != null) {
            pharmacy.setTitle(request.getTitle());
        }
        if (request.getDescription() != null) {
            pharmacy.setDescription(request.getDescription());
        }
        if (request.getAddress() != null) {
            pharmacy.setAddress(request.getAddress());
        }
        if (request.getAdminId() != null) {
            Set<String> adminIds = new HashSet<>();
//            for (String id: request.getAdminIds()) {
                if (!pharmacy.getAdminIds().contains(request.getAdminId())) {
                    User admin = userRepository.findById(request.getAdminId()).orElseThrow(
                            () -> new ValidationException("Admin id not found")
                    );
                    Role adminRole = new Role(Role.PHARMACY_USER);
                    if (!admin.getAuthorities().contains(adminRole)) {
                        throw new ValidationException("Admin id not found");
                    }
                    adminIds.add(admin.getId());
                } else {
                    adminIds.add(request.getAdminId());
                }
//            }
            pharmacy.setAdminIds(adminIds);
        }
    }

    public PharmacyDto toPharmacyDto (Pharmacy pharmacy) {
        if (pharmacy == null) {
            return null;
        }

        return new PharmacyDto()
                .setTitle(pharmacy.getTitle())
                .setId(pharmacy.getId())
                .setDescription(pharmacy.getDescription())
                .setAddress(pharmacy.getAddress());
    }

    public List<PharmacyDto> toPharmacyDto (List<Pharmacy> pharmacies) {
        if (pharmacies == null) {
            return null;
        }

        List<PharmacyDto> list= new ArrayList<>(pharmacies.size());

        for (Pharmacy pharmacy : pharmacies) {
            list.add(this.toPharmacyDto(pharmacy));
        }

        return list;
    }

}
