package com.example.mediservapi.controller;

import com.example.mediservapi.configuration.security.JwtTokenUtil;
import com.example.mediservapi.controller.request.AuthRequest;
import com.example.mediservapi.controller.request.CreateUpdateUserRequest;
import com.example.mediservapi.dto.mapper.UserMapper;
import com.example.mediservapi.dto.model.user.UserDto;
import com.example.mediservapi.dto.response.AuthResponse;
import com.example.mediservapi.model.user.User;
import com.example.mediservapi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "api/public")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final UserMapper userMapper;
    private final UserService userService;

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
}
