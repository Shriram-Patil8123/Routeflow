package com.routeflow.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.routeflow.api.entity.OrderItem;
import com.routeflow.api.repository.OrderItemRepository;

@Service
public class OrderItemService {

    private final OrderItemRepository orderItemRepository;

    public OrderItemService(OrderItemRepository orderItemRepository) {
        this.orderItemRepository = orderItemRepository;
    }

    public OrderItem createOrderItem(OrderItem orderItem) {
        return orderItemRepository.save(orderItem);
    }

    public List<OrderItem> getAllOrderItems() {
        return orderItemRepository.findAll();
    }

    public OrderItem getOrderItemById(Long id) {
        return orderItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order item not found"));
    }

    public OrderItem updateOrderItem(Long id, OrderItem updatedOrderItem) {

        OrderItem orderItem = getOrderItemById(id);

        orderItem.setOrderId(updatedOrderItem.getOrderId());
        orderItem.setProductId(updatedOrderItem.getProductId());
        orderItem.setQuantity(updatedOrderItem.getQuantity());
        orderItem.setPrice(updatedOrderItem.getPrice());

        return orderItemRepository.save(orderItem);
    }

    public void deleteOrderItem(Long id) {
        orderItemRepository.deleteById(id);
    }
}