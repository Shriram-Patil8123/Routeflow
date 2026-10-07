package com.routeflow.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.routeflow.api.entity.Order;
import com.routeflow.api.repository.OrderRepository;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    public Order updateOrder(Long id, Order updatedOrder) {

        Order order = getOrderById(id);

        order.setCustomerId(updatedOrder.getCustomerId());
        order.setTotalAmount(updatedOrder.getTotalAmount());
        order.setStatus(updatedOrder.getStatus());

        return orderRepository.save(order);
    }

    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
}