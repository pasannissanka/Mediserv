package com.example.mediservapi.controller;

import com.example.mediservapi.dto.model.user.SignUpData;
import com.example.mediservapi.dto.model.user.UserDto;
import com.example.mediservapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping(value = "/create")
    public ResponseEntity saveNewUser(@RequestBody SignUpData signUpData) {
        SignUpData data = userService.signUp(signUpData.getUser(), signUpData.getPharmacy());
        return new ResponseEntity(data, HttpStatus.OK);
    }

    @GetMapping(value = "/all")
    public List<UserDto> getAllUsers() {
        return userService.findAll();
    }

}
