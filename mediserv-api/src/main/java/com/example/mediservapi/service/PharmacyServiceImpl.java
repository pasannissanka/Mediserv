package com.example.mediservapi.service;

import com.example.mediservapi.dto.mapper.UserMapper;
import com.example.mediservapi.dto.model.order.OrderDto;
import com.example.mediservapi.dto.model.order.OrderSearchQuery;
import com.example.mediservapi.dto.model.pharmacy.PharmacySearchQuery;
import com.example.mediservapi.dto.model.request.CreateUpdatePharmacyRequest;
import com.example.mediservapi.dto.model.request.Page;
import com.example.mediservapi.model.pharmacy.Pharmacy;
import com.example.mediservapi.repository.order.OrderRepository;
import com.example.mediservapi.repository.pharmacy.PharmacyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class PharmacyServiceImpl implements PharmacyService {

    @Autowired
    private PharmacyRepository pharmacyRepository;

    @Autowired
    private UserMapper userMapper;

    @Override
    public Pharmacy createNew(CreateUpdatePharmacyRequest pharmacyData) {
        Pharmacy newPharmacy = new Pharmacy()
                .setTitle(pharmacyData.getTitle())
                .setAddress(pharmacyData.getAddress())
                .setDescription(pharmacyData.getDescription());
        return pharmacyRepository.save(newPharmacy);
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
                    .setTitle(pharmacyData.getTitle())
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

    @Override
    public List<Pharmacy> search(Page page, PharmacySearchQuery searchQuery) {
        return pharmacyRepository.searchPharmacy(page, searchQuery);
    }
}
