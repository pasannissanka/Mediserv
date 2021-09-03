package com.example.mediservapi.controller;

import com.example.mediservapi.controller.request.CreateUpdateUserRequest;
import com.example.mediservapi.dto.response.Response;
import com.example.mediservapi.model.user.User;
import com.example.mediservapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public Response saveNewUser(@RequestBody @Valid CreateUpdateUserRequest user) {
        User data = userService.signUp(user);
        System.out.println(data);
        if (data == null) {
            return Response.duplicateEntity().setErrors("Email already exists");
        }
        return Response.ok().setPayload(data);
    }

    @PutMapping(value = "/{id}")
    public Response updateUser(@PathVariable String id, @RequestBody CreateUpdateUserRequest user) {
        User data = userService.updateProfile(id, user);
        System.out.println(data);
        if (data == null) {
            return Response.duplicateEntity().setErrors("User not found");
        }
        return Response.ok().setPayload(data);
    }

    @GetMapping(value = "/")
    public Response getAllUsers() {
        List<User> data = userService.findAll();
        if (data == null) {
            return Response.notFound().setErrors("No data found");
        }
        return Response.ok().setPayload(data);
    }

    @GetMapping(value = "/email/{email}")
    public Response getUserByEmail(@PathVariable String email) {
        Optional<User> data = userService.findByEmail(email);
        if (data.isEmpty()) {
            return Response.notFound().setErrors("User not found");
        }
        return Response.ok().setPayload(data);
    }

    @GetMapping(value = "/id/{id}")
    public Response getUserById(@PathVariable String id) {
        Optional<User> data = userService.findById(id);
        if (data.isEmpty()) {
            return Response.notFound().setErrors("User not found");
        }
        return Response.ok().setPayload(data);
    }

}
