package com.example.mediservapi.dto.mapper;

import com.example.mediservapi.controller.request.CreateUpdateUserRequest;
import com.example.mediservapi.dto.model.user.UserDto;
import com.example.mediservapi.model.user.Role;
import com.example.mediservapi.model.user.User;
import com.example.mediservapi.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static java.util.stream.Collectors.toSet;

@Component
public class UserMapper {
    @Autowired
    private UserRepository userRepository;

    public UserDto toUserDto(User user) {
        if ( user == null ) {
            return null;
        }
        UserDto userDto = new UserDto();
        userDto.setId( user.getId() );
        userDto.setEmail( user.getEmail() );
        userDto.setName( user.getName() );
        userDto.setAuthorities( mapAuthorities( user.getAuthorities() ) );

        return userDto;
    }

    public List<UserDto> toUserDto(List<User> users) {
        if ( users == null ) {
            return null;
        }
        List<UserDto> list = new ArrayList<UserDto>( users.size() );
        for ( User user : users ) {
            list.add( toUserDto( user ) );
        }

        return list;
    }
    public String mapAuthority(Role value) {
        return value.getAuthority();
    }

    public Set<String> mapAuthorities(Set<Role> value) {
        if ( value == null ) {
            return null;
        }

        Set<String> set = new HashSet<String>( Math.max( (int) ( value.size() / .75f ) + 1, 16 ) );
        for ( Role role : value ) {
            set.add( this.mapAuthority( role ) );
        }

        return set;
    }

    public User createUser(CreateUpdateUserRequest request) {
        if ( request == null ) {
            return null;
        }

        User user = new User();

        user.setEmail( request.getEmail() );
        user.setName( request.getName() );
        user.setPassword( request.getPassword() );
        user.setDeliveryAddress( request.getDeliveryAddress() );
        user.setBillingAddress( request.getBillingAddress() );

        this.afterUpdate( request, user );

        return user;
    }

    public void updateUser(CreateUpdateUserRequest request, User user) {
        if ( request == null ) {
            return;
        }

        if ( request.getEmail() != null ) {
            user.setEmail( request.getEmail() );
        }
        if ( request.getName() != null ) {
            user.setName( request.getName() );
        }
        if ( request.getPassword() != null ) {
            user.setPassword( request.getPassword() );
        }
        if ( request.getDeliveryAddress() != null ) {
            user.setDeliveryAddress( request.getDeliveryAddress() );
        }
        if ( request.getBillingAddress() != null ) {
            user.setBillingAddress( request.getBillingAddress() );
        }

        afterUpdate( request, user );
    }

    private void afterUpdate(CreateUpdateUserRequest request, User user) {
        if (request.getAuthorities() != null) {
            user.setAuthorities(request.getAuthorities().stream().map(Role::new).collect(toSet()));
        }
    }
}
