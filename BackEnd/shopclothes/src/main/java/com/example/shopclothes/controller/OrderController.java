package com.example.shopclothes.controller;

import com.example.shopclothes.dto.OrderDTO;
import com.example.shopclothes.entity.Order;
import com.example.shopclothes.exception.DataNotFoundException;
import com.example.shopclothes.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("${api.prefix}/order")
public class OrderController {

    @Autowired
    OrderService orderService;

    @GetMapping("")
    public ResponseEntity<?> getList(){
        List<Order> list = orderService.getAllListOrder();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/user")
    public ResponseEntity<?> getListByUser(@RequestParam("username") String username){
        List<Order> list = null;
        try {
            list = orderService.getOrderByUserName(username);
            return ResponseEntity.ok(list);
        } catch (DataNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/create")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    public ResponseEntity<?> placeOrder(@RequestBody OrderDTO orderDTO){
        try {
            orderService.placeOrder(orderDTO);
            return ResponseEntity.ok("Order thành công");
        } catch (DataNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
}
