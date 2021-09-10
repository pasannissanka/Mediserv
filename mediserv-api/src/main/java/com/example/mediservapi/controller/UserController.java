package com.example.mediservapi.controller;

import com.example.mediservapi.dto.model.request.CreateUpdateUserRequest;
import com.example.mediservapi.dto.model.user.UserDto;
import com.example.mediservapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<UserDto> saveNewUser(@RequestBody @Valid CreateUpdateUserRequest user) {
        UserDto data = userService.create(user);
        return ResponseEntity.ok(data);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable String id, @RequestBody CreateUpdateUserRequest user) {
        UserDto data = userService.updateProfile(id, user);
        return ResponseEntity.ok(data);
    }

    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> data = userService.findAll();
        return ResponseEntity.ok(data);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable String id) {
        UserDto data = userService.findById(id);
        return ResponseEntity.ok(data);
    }
}
