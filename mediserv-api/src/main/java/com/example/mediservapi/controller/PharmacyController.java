package com.example.mediservapi.controller;

import com.example.mediservapi.dto.model.pharmacy.PharmacySearchQuery;
import com.example.mediservapi.dto.model.request.CreateUpdatePharmacyRequest;
import com.example.mediservapi.dto.model.request.SearchRequest;
import com.example.mediservapi.dto.response.Response;
import com.example.mediservapi.model.pharmacy.Pharmacy;
import com.example.mediservapi.model.user.Role;
import com.example.mediservapi.service.PharmacyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/pharmacies")
public class PharmacyController {

    @Autowired
    private PharmacyService pharmacyService;

    @PostMapping(value = "/")
    public Response createNewPharmacy(@RequestBody @Valid CreateUpdatePharmacyRequest pharmacyData) {
        Pharmacy pharmacy = pharmacyService.createNew(pharmacyData);
        if (pharmacy != null) {
            return Response.ok().setPayload(pharmacy);
        }
        return Response.notFound().setErrors("Pharmacy creation failed!");
    }

    @RolesAllowed({Role.PHARMACY_USER, Role.SUPER_ADMIN})
    @PutMapping(value = "/{id}")
    public Response updatePharmacy(@PathVariable String id, @RequestBody @Valid CreateUpdatePharmacyRequest pharmacyData) {
        Pharmacy data = pharmacyService.updatePharmacy(id, pharmacyData);
        if (data == null) {
            return Response.duplicateEntity().setErrors("Pharmacy not found");
        }
        return Response.ok().setPayload(data);
    }

    @GetMapping(value = "/")
    public Response getAllPharmacies() {
        List<Pharmacy> data = pharmacyService.findAll();
        if (data == null) {
            return Response.notFound().setErrors("No data found");
        }
        return Response.ok().setPayload(data);
    }

    @GetMapping(value = "/{id}")
    public Response getPharmacyById(@PathVariable String id) {
        Optional<Pharmacy> data = pharmacyService.findById(id);
        if (data.isEmpty()) {
            return Response.notFound().setErrors("Pharmacy not found");
        }
        return Response.ok().setPayload(data);
    }

    @PostMapping("search")
    @PreAuthorize("hasAuthority('PHARMACY_USER') or hasAuthority('SUPER_ADMIN')")
    public ResponseEntity<List<Pharmacy>> search(@RequestBody @Valid SearchRequest<PharmacySearchQuery> request) {
        List<Pharmacy> pharmacy = pharmacyService.search(request.getPage(), request.getQuery());
        return ResponseEntity.ok(pharmacy);
    }
}
