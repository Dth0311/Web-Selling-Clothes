package com.example.shopclothes.service;

import com.example.shopclothes.dto.UserDTO;
import com.example.shopclothes.entity.ERole;
import com.example.shopclothes.entity.Role;
import com.example.shopclothes.entity.User;
import com.example.shopclothes.repository.RoleRepository;
import com.example.shopclothes.repository.UserRepository;
import com.example.shopclothes.request.UserRequest;
import com.example.shopclothes.service.Imp.ILoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class LoginService implements ILoginService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    RoleRepository roleRepository;


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
    public boolean checkLogin(String userName, String password) {
        User user = userRepository.findByUserName(userName);
        return passwordEncoder.matches(password,user.getPassword());
    }

    @Override
    public boolean addUser(UserRequest userRequest) {
        User user = new User();
        user.setUsername(userRequest.getUsername());
        user.setEmail(userRequest.getEmail());
        user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        user.setEnable(true);
        Set<String> strRoles = userRequest.getRole();
        Set<Role> roles = new HashSet<>();
        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
            user.setRoles(roles);
        }
        else {
            for (var item:strRoles) {
                Role role = new Role();
                if (Objects.equals(item, "admin")){
                    role.setName(ERole.ROLE_ADMIN);
                    roles.add(role);
                } else if (Objects.equals(item, "mod")) {
                    role.setName(ERole.ROLE_MODERATOR);
                    roles.add(role);
                }else {
                    role.setName(ERole.ROLE_USER);
                    roles.add(role);
                }
            }
            user.setRoles(roles);
        }
        try {
            userRepository.save(user);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }
}
