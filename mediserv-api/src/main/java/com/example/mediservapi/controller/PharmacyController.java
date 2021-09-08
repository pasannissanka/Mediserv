package com.example.mediservapi.controller;

import com.example.mediservapi.controller.request.CreateUpdatePharmacyRequest;
import com.example.mediservapi.dto.response.Response;
import com.example.mediservapi.model.pharmacy.Pharmacy;
import com.example.mediservapi.service.PharmacyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
}
