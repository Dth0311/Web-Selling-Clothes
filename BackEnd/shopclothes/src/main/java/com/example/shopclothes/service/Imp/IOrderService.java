package com.example.shopclothes.service.Imp;

import com.example.shopclothes.dto.OrderDTO;
import com.example.shopclothes.entity.Order;
import com.example.shopclothes.exception.DataNotFoundException;

import java.util.List;

public interface IOrderService {

    List<Order> getAllListOrder();

    void placeOrder(OrderDTO orderDTO) throws DataNotFoundException;

    List<Order> getOrderByUserName(String userName) throws DataNotFoundException;
}
