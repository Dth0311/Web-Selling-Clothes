package com.example.shopclothes.service;

import com.example.shopclothes.dto.UserDTO;
import com.example.shopclothes.entity.ERole;
import com.example.shopclothes.entity.Role;
import com.example.shopclothes.entity.User;
import com.example.shopclothes.exception.DataNotFoundException;
import com.example.shopclothes.repository.RoleRepository;
import com.example.shopclothes.repository.UserRepository;
import com.example.shopclothes.request.LoginRequest;
import com.example.shopclothes.request.UserRequest;
import com.example.shopclothes.service.Imp.ILoginService;
import com.example.shopclothes.utils.JwtUtilsHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class LoginService implements ILoginService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    JwtUtilsHelper jwtUtilsHelper;

    @Autowired
    AuthenticationManager authenticationManager;


    @Override
    public List<UserDTO> getAllUser() {
        List<User> listUser = userRepository.findAll();
        List<UserDTO> userDTOList = new ArrayList<>();
        for (var user : listUser) {
            UserDTO userDTO = UserDTO.fromUser(user);
            userDTOList.add(userDTO);
        }
        return userDTOList;
    }

    @Override
    public String checkLogin(LoginRequest loginRequest) throws DataNotFoundException {
        User user = userRepository.findByUserName(loginRequest.getUserName());
//        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
//                userName, password,
//                user.getAuthorities()
//        );
//        authenticationManager.authenticate(authenticationToken);
        if(passwordEncoder.matches(loginRequest.getPassword(),user.getPassword())){
            return jwtUtilsHelper.generateToken(loginRequest.getUserName());
        }
        else {
            throw new DataNotFoundException("Sai tài khoản hoặc mật khẩu");
        }
    }

    @Override
    @Transactional
    public boolean addUser(UserRequest userRequest) {
        try {
        User user = new User();
        user.setUsername(userRequest.getUserName());
        user.setEmail(userRequest.getEmail());
        user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        user.setEnable(true);
        Role role = roleRepository.findByName(ERole.ROLE_USER).orElseThrow(() -> new DataNotFoundException("Không có role"));
        user.setRole(role);
            userRepository.save(user);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }
}
