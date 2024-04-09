package com.example.shopclothes.controller;

import com.example.shopclothes.dto.OrderDTO;
import com.example.shopclothes.entity.Order;
import com.example.shopclothes.entity.OrderDetail;
import com.example.shopclothes.exception.DataNotFoundException;
import com.example.shopclothes.repository.OrderDetailRepository;
import com.example.shopclothes.response.OrderDetailResponse;
import com.example.shopclothes.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

@RestController
@CrossOrigin(origins = "*",maxAge = 3600)
@RequestMapping("${api.prefix}/order")
public class OrderController {

    @Autowired
    OrderService orderService;

    @Autowired
    OrderDetailRepository orderDetailRepository;

    @GetMapping("")
    public ResponseEntity<?> getList(){
        List<Order> list = orderService.getAllListOrder();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/detail")
    public ResponseEntity<?> getListProductOrder(){
        List<OrderDetail> resultList = orderDetailRepository.findAll();
        List<OrderDetailResponse> responses = new ArrayList<>();
        for (var item:resultList) {
            OrderDetailResponse detailResponse = new OrderDetailResponse();
            detailResponse.setProduct(item.getProduct());
            detailResponse.setQuantity(item.getQuantity());
            responses.add(detailResponse);
        }
        Comparator<OrderDetailResponse> idComparator = new Comparator<OrderDetailResponse>() {
            @Override
            public int compare(OrderDetailResponse o1, OrderDetailResponse o2) {
                return Integer.compare(o1.getProduct().getId(), o2.getProduct().getId());
            }
        };
        Collections.sort(responses, idComparator);
        int count = 0;
        List<OrderDetailResponse> responses1 = new ArrayList<>();
        for (int i = 0; i < responses.size() - 2 ; i = i + count+ 1) {
            OrderDetailResponse orderDetailResponse = responses.get(i);
            count = 0;
            for (int j = i+1; j <= responses.size() - 1 ; j++) {
                if (orderDetailResponse.getProduct() == responses.get(j).getProduct()){
                    orderDetailResponse.setQuantity(orderDetailResponse.getQuantity() + responses.get(j).getQuantity());
                    count++;
                }
            }
            responses1.add(orderDetailResponse);
        }
        Comparator<OrderDetailResponse> idComparator1 = new Comparator<OrderDetailResponse>() {
            @Override
            public int compare(OrderDetailResponse o1, OrderDetailResponse o2) {
                return Integer.compare(o2.getQuantity(), o1.getQuantity());
            }
        };
        Collections.sort(responses1, idComparator1);
        return ResponseEntity.ok(responses1);
    }

    @GetMapping("/revenue")
    public ResponseEntity<?> getRevenueByDateRange(
            @RequestParam("startDate") String startDate,
            @RequestParam("endDate") String  endDate) {
        Map<String, Long> revenueMap = orderService.getRevenueByDate(startDate, endDate);
        return ResponseEntity.ok(revenueMap);
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
