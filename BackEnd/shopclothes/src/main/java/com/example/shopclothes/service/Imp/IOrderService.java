package com.example.shopclothes.service.Imp;

import com.example.shopclothes.dto.OrderDTO;
import com.example.shopclothes.entity.Order;
import com.example.shopclothes.exception.DataNotFoundException;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Map;

public interface IOrderService {

    List<Order> getAllListOrder();

    void placeOrder(OrderDTO orderDTO) throws DataNotFoundException;

    List<Order> getOrderByUserName(String userName) throws DataNotFoundException;

    Map<String,Long> getRevenueByDate(String startDate, String endDate);

    void enableOrder(int id) throws DataNotFoundException;
}
