package com.example.shopclothes.service.Imp;

import com.example.shopclothes.dto.UserDTO;
import com.example.shopclothes.entity.User;
import com.example.shopclothes.exception.DataNotFoundException;
import com.example.shopclothes.request.UserRequest;

public interface IUserService {
    void register(UserRequest userRequest);

    User getUserByUsername(String username) throws DataNotFoundException;

    User updateUser(UserDTO userDTO) throws DataNotFoundException;
}
