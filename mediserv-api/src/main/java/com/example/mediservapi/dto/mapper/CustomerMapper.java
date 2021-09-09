package com.example.mediservapi.dto.mapper;

import com.example.mediservapi.dto.model.user.CustomerDto;
import com.example.mediservapi.dto.model.user.UserDto;
import com.example.mediservapi.model.user.User;
import com.example.mediservapi.repository.user.UserRepository;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.mapstruct.NullValueCheckStrategy.ALWAYS;
import static org.mapstruct.NullValuePropertyMappingStrategy.IGNORE;
import static org.mapstruct.NullValuePropertyMappingStrategy.SET_TO_NULL;

@Mapper(componentModel = "spring")
public abstract class CustomerMapper {
    @Autowired
    private UserRepository userRepository;

    @BeanMapping(nullValueCheckStrategy = ALWAYS, nullValuePropertyMappingStrategy = SET_TO_NULL)
    public abstract CustomerDto toCustomerDto(User user);
    @BeanMapping(nullValueCheckStrategy = ALWAYS, nullValuePropertyMappingStrategy = SET_TO_NULL)
    public abstract List<CustomerDto> toCustomerDto(List<User> users);
}
