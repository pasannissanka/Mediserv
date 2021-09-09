package com.example.mediservapi.controller;

import com.example.mediservapi.controller.request.CreateUpdateUserRequest;
import com.example.mediservapi.dto.model.user.UserDto;
import com.example.mediservapi.dto.response.Response;
import com.example.mediservapi.model.user.User;
import com.example.mediservapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping(value = "/")
    public ResponseEntity<UserDto> saveNewUser(@RequestBody @Valid CreateUpdateUserRequest user) {
        UserDto data = userService.create(user);
        return ResponseEntity.ok(data);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable String id, @RequestBody CreateUpdateUserRequest user) {
        UserDto data = userService.updateProfile(id, user);
        return ResponseEntity.ok(data);
    }

    @GetMapping(value = "/")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> data = userService.findAll();
        return ResponseEntity.ok(data);
    }

    @GetMapping(value = "/id/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable String id) {
        UserDto data = userService.findById(id);
        return ResponseEntity.ok(data);
    }
}
