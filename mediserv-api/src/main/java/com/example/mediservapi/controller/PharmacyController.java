package com.example.mediservapi.controller;

import com.example.mediservapi.dto.model.pharmacy.PharmacyDto;
import com.example.mediservapi.dto.model.pharmacy.PharmacySearchQuery;
import com.example.mediservapi.dto.model.request.CreatePharmacyRequest;
import com.example.mediservapi.dto.model.request.SearchRequest;
import com.example.mediservapi.dto.model.request.UpdatePharmacyRequest;
import com.example.mediservapi.service.PharmacyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/pharmacies")
public class PharmacyController {

    @Autowired
    private PharmacyService pharmacyService;

    @PostMapping(value = "/")
    public ResponseEntity<PharmacyDto> createNewPharmacy(@RequestBody @Valid CreatePharmacyRequest pharmacyData) {
        PharmacyDto pharmacy = pharmacyService.createNew(pharmacyData);
        return ResponseEntity.ok(pharmacy);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<PharmacyDto> updatePharmacy(@PathVariable String id, @RequestBody @Valid UpdatePharmacyRequest pharmacyData) {
        PharmacyDto data = pharmacyService.updatePharmacy(id, pharmacyData);
        return ResponseEntity.ok(data);
    }

    @GetMapping(value = "/")
    public ResponseEntity<List<PharmacyDto>> getAllPharmacies() {
        List<PharmacyDto> data = pharmacyService.findAll();
        return ResponseEntity.ok(data);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<PharmacyDto> getPharmacyById(@PathVariable String id) {
        PharmacyDto data = pharmacyService.findById(id);
        return ResponseEntity.ok(data);
    }

    @PostMapping("search")
    public ResponseEntity<List<PharmacyDto>> search(@RequestBody @Valid SearchRequest<PharmacySearchQuery> request) {
        List<PharmacyDto> pharmacy = pharmacyService.search(request.getPage(), request.getQuery());
        return ResponseEntity.ok(pharmacy);
    }

    @GetMapping("user")
    public ResponseEntity<List<PharmacyDto>> getUsersPharmacy(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        List<PharmacyDto> data = pharmacyService.getUsersPharmacy(userDetails.getUsername());
        return ResponseEntity.ok(data);
    }
}
