package com.example.shopclothes.service.Imp;

import com.example.shopclothes.dto.UserDTO;
import com.example.shopclothes.exception.DataNotFoundException;
import com.example.shopclothes.request.LoginRequest;
import com.example.shopclothes.request.UserRequest;

import java.util.List;

public interface ILoginService {

    List<UserDTO> getAllUser();
    String checkLogin(LoginRequest loginRequest) throws DataNotFoundException;
    boolean addUser(UserRequest userRequest);
}
