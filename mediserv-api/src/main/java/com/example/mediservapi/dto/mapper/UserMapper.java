package com.example.mediservapi.dto.mapper;

import com.example.mediservapi.controller.request.CreateUpdateUserRequest;
import com.example.mediservapi.dto.model.user.UserDto;
import com.example.mediservapi.model.user.Role;
import com.example.mediservapi.model.user.User;
import com.example.mediservapi.repository.user.UserRepository;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

import static java.util.stream.Collectors.toSet;
import static org.mapstruct.NullValueCheckStrategy.ALWAYS;
import static org.mapstruct.NullValuePropertyMappingStrategy.IGNORE;

@Mapper(componentModel = "spring")
public abstract class UserMapper {
    @Autowired
    private UserRepository userRepository;

    public abstract UserDto toUserDto(User user);
    public abstract List<UserDto> toUserDto(List<User> users);

    @Mapping(target = "authorities", ignore = true)
    public abstract User createUser(CreateUpdateUserRequest request);

    @AfterMapping
    protected void afterCreateUser(CreateUpdateUserRequest request, @MappingTarget User user) {
        if (request.getAuthorities() != null) {
            user.setAuthorities(request.getAuthorities().stream().map(Role::new).collect(toSet()));
        }
    }

    @BeanMapping(nullValueCheckStrategy = ALWAYS, nullValuePropertyMappingStrategy = IGNORE)
    @Mapping(target = "authorities", ignore = true)
    public abstract void updateUser(CreateUpdateUserRequest request, @MappingTarget User user);

    @AfterMapping
    protected void afterUpdate(CreateUpdateUserRequest request, @MappingTarget User user) {
        if (request.getAuthorities() != null) {
            user.setAuthorities(request.getAuthorities().stream().map(Role::new).collect(toSet()));
        }
    }
}
