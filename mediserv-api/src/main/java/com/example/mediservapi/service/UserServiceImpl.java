package com.example.mediservapi.service;

import com.example.mediservapi.dto.mapper.UserMapper;
import com.example.mediservapi.dto.model.pharmacy.PharmacyDto;
import com.example.mediservapi.dto.model.user.SignUpData;
import com.example.mediservapi.dto.model.user.UserDto;
import com.example.mediservapi.model.pharmacy.Pharmacy;
import com.example.mediservapi.model.user.User;
import com.example.mediservapi.repository.pharmacy.PharmacyRepository;
import com.example.mediservapi.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PharmacyRepository pharmacyRepository;

    @Override
    public SignUpData signUp(UserDto userDto, Pharmacy pharmacy) {
        User user = userRepository.findByEmail(userDto.getEmail());
        if (user == null) {
            Pharmacy newPharma = pharmacyRepository.save(pharmacy);
            System.out.println(newPharma);
            user = new User()
                    .setEmail(userDto.getEmail())
                    .setUserType(userDto.getUserType())
                    .setAddress(userDto.getAddress())
                    .setName(userDto.getName())
                    .setPharmacy(newPharma);
            UserDto newUser = UserMapper.toUserDto(userRepository.save(user));
            return new SignUpData().setUser(newUser).setPharmacy(newPharma);
        }
        return null;
    }


    @Override
    public UserDto findByEmail(String email) {
        return null;
    }

    @Override
    public UserDto updateProfile(UserDto userDto) {
        return null;
    }

    @Override
    public List<UserDto> findAll() {
        return userRepository.findAll().stream().map(UserMapper::toUserDto).collect(Collectors.toList());
    }
}
