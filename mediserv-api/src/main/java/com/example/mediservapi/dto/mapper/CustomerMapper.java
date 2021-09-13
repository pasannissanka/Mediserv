package com.example.mediservapi.dto.mapper;

import com.example.mediservapi.dto.model.user.CustomerDto;
import com.example.mediservapi.model.user.User;
import com.example.mediservapi.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class CustomerMapper {
    @Autowired
    private UserRepository userRepository;

    public CustomerDto toCustomerDto(User user) {
        if ( user == null ) {
            return null;
        }

        CustomerDto customerDto = new CustomerDto();

        if ( user.getId() != null ) {
            customerDto.setId( user.getId() );
        }
        if ( user.getEmail() != null ) {
            customerDto.setEmail( user.getEmail() );
        }
        if ( user.getName() != null ) {
            customerDto.setName( user.getName() );
        }
        if ( user.getDeliveryAddress() != null ) {
            customerDto.setDeliveryAddress( user.getDeliveryAddress() );
        }
        if ( user.getBillingAddress() != null ) {
            customerDto.setBillingAddress( user.getBillingAddress() );
        }

        return customerDto;
    }

    public List<CustomerDto> toCustomerDto(List<User> users) {
        if ( users == null ) {
            return null;
        }

        List<CustomerDto> list = new ArrayList<CustomerDto>( users.size() );
        for ( User user : users ) {
            list.add( toCustomerDto( user ) );
        }

        return list;
    }
}
