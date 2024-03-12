package com.example.shopclothes.service;

import com.example.shopclothes.dto.UserDTO;
import com.example.shopclothes.entity.ERole;
import com.example.shopclothes.entity.Role;
import com.example.shopclothes.entity.User;
import com.example.shopclothes.exception.DataNotFoundException;
import com.example.shopclothes.repository.RoleRepository;
import com.example.shopclothes.repository.UserRepository;
import com.example.shopclothes.request.UserRequest;
import com.example.shopclothes.service.Imp.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Service
public class UserService implements IUserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public void register(UserRequest userRequest) {
        User user = new User();
        user.setUsername(userRequest.getUsername());
        user.setEmail(userRequest.getEmail());
        user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        Set<String> strRoles = userRequest.getRole();
        Set<Role> roles = new HashSet<>();
        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
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
        userRepository.save(user);
    }

    @Override
    public User getUserByUsername(String username) throws DataNotFoundException {
        User user = userRepository.findByUserName(username);
        if(user == null){
            throw new DataNotFoundException("Không tìm thấy username: " + username);
        }
        return user;
    }

    @Override
    public User updateUser(UserDTO userDTO) throws DataNotFoundException {
        User user = userRepository.findByUserName(userDTO.getUserName());
        if(user == null){
            throw new DataNotFoundException("Không tìm thấy username: " + userDTO.getUserName());
        }
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setEmail(userDTO.getEmail());
        user.setCountry(userDTO.getCountry());
        user.setState(userDTO.getState());
        user.setAddress(userDTO.getAddress());
        user.setPhone(userDTO.getPhone());
        userRepository.save(user);
        return user;
    }
}
