package com.example.mediservapi.controller;

import com.example.mediservapi.configuration.security.JwtTokenUtil;
import com.example.mediservapi.dto.model.pharmacy.PharmacyDto;
import com.example.mediservapi.dto.model.pharmacy.PharmacySearchQuery;
import com.example.mediservapi.dto.model.request.AuthRequest;
import com.example.mediservapi.dto.model.request.CreatePharmacyRequest;
import com.example.mediservapi.dto.model.request.CreateUpdateUserRequest;
import com.example.mediservapi.dto.mapper.UserMapper;
import com.example.mediservapi.dto.model.request.SearchRequest;
import com.example.mediservapi.dto.model.user.UserDto;
import com.example.mediservapi.dto.response.AuthResponse;
import com.example.mediservapi.dto.response.LoadFile;
import com.example.mediservapi.dto.response.Response;
import com.example.mediservapi.model.user.User;
import com.example.mediservapi.service.FileService;
import com.example.mediservapi.service.PharmacyService;
import com.example.mediservapi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(path = "/api/public")
@RequiredArgsConstructor
public class PublicController {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final UserMapper userMapper;
    private final UserService userService;
    private final PharmacyService pharmacyService;
    private final FileService fileService;

    @PostMapping("login")
    public ResponseEntity<AuthResponse> login(@RequestBody @Valid AuthRequest request) {
        try {
            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

            User user = (User) authentication.getPrincipal();
            String authToken = jwtTokenUtil.generateAccessToken(user);
            return ResponseEntity.ok()
                    .header(HttpHeaders.AUTHORIZATION, authToken)
                    .body(new AuthResponse(userMapper.toUserDto(user), authToken));
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("register")
    public UserDto register(@RequestBody @Valid CreateUpdateUserRequest request) {
        return userService.create(request);
    }

    @PostMapping("/pharmacies/search")
    public ResponseEntity<List<PharmacyDto>> search(@RequestBody @Valid SearchRequest<PharmacySearchQuery> request) {
        List<PharmacyDto> pharmacy = pharmacyService.search(request.getPage(), request.getQuery());
        return ResponseEntity.ok(pharmacy);
    }

    @PostMapping(value = "/pharmacies/")
    public ResponseEntity<PharmacyDto> createNewPharmacy(@RequestBody @Valid CreatePharmacyRequest pharmacyData) {
        PharmacyDto pharmacy = pharmacyService.createNew(pharmacyData);
        return ResponseEntity.ok(pharmacy);
    }

    @GetMapping("/banner/download/{bannerId}")
    public ResponseEntity<ByteArrayResource> downloadPharmacyBanner(@PathVariable String bannerId) throws IOException {
        if (this.pharmacyService.isPharmacyBanner(bannerId)) {
            LoadFile loadFile = fileService.downloadFile(bannerId);
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(loadFile.getFileType()))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + loadFile.getFilename() + "\"")
                    .body(new ByteArrayResource(loadFile.getFile()));
        } else {
            return ResponseEntity.notFound().build();
        }

    }

}
