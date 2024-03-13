package com.example.shopclothes.service.Imp;

import com.example.shopclothes.dto.UserDTO;
import com.example.shopclothes.request.UserRequest;

import java.util.List;

public interface ILoginService {

    List<UserDTO> getAllUser();
    boolean checkLogin(String userName,String password);
    boolean addUser(UserRequest userRequest);
}
