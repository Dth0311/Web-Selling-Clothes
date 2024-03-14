package com.example.shopclothes.service;

import com.example.shopclothes.dto.OrderDTO;
import com.example.shopclothes.dto.OrderDetailDTO;
import com.example.shopclothes.entity.Order;
import com.example.shopclothes.entity.OrderDetail;
import com.example.shopclothes.entity.Product;
import com.example.shopclothes.entity.User;
import com.example.shopclothes.exception.DataNotFoundException;
import com.example.shopclothes.repository.OrderDetailRepository;
import com.example.shopclothes.repository.OrderRepository;
import com.example.shopclothes.repository.ProductRepository;
import com.example.shopclothes.repository.UserRepository;
import com.example.shopclothes.service.Imp.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService implements IOrderService {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OrderDetailRepository orderDetailRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProductRepository productRepository;

    @Override
    public List<Order> getAllListOrder() {
        return orderRepository.findAll();
    }

    @Override
    public void placeOrder(OrderDTO orderDTO) throws DataNotFoundException {
        Order order = new Order();
        User user = userRepository.findByUserName(orderDTO.getUsername());
        order.setFirstName(orderDTO.getFirstName());
        order.setLastName(orderDTO.getLastName());
        order.setCountry(orderDTO.getCountry());
        order.setAddress(orderDTO.getAddress());
        order.setTown(orderDTO.getTown());
        order.setState(orderDTO.getState());
        order.setPostCode(orderDTO.getPostCode());
        order.setEmail(orderDTO.getEmail());
        order.setPhone(orderDTO.getPhone());
        order.setNote(orderDTO.getNote());
        orderRepository.save(order);
        long sum = 0;
        for(var item: orderDTO.getOrderDetailDTOS()){
            OrderDetail orderDetail = new OrderDetail();
            Product product = productRepository.findById(item.getProductId()).orElseThrow(() -> new DataNotFoundException("Không tìm thấy id product: " + item.getProductId()));
            orderDetail.setProduct(product);
            orderDetail.setPrice(item.getPrice());
            orderDetail.setQuantity(item.getQuantity());
            orderDetail.setSubTotal(item.getPrice() * item.getQuantity());
            orderDetail.setOrder(order);
            sum += orderDetail.getSubTotal();
            orderDetailRepository.save(orderDetail);
        }
        order.setTotalPrice(sum);
        order.setUser(user);
        orderRepository.save(order);
    }

    @Override
    public List<Order> getOrderByUserName(String userName) throws DataNotFoundException {
        User user = userRepository.findByUserName(userName);
        if (user == null){
            throw new DataNotFoundException("Không tìm thấy username: " + userName);
        }
        List<Order> orders = orderRepository.getOrderByUserId(user.getId());
        return orders;
    }
}
