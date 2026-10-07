package com.routeflow.api.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.routeflow.api.entity.OrderItem;
import com.routeflow.api.service.OrderItemService;

@RestController
@RequestMapping("/api/order-items")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderItemController {

    private final OrderItemService orderItemService;

    public OrderItemController(OrderItemService orderItemService) {
        this.orderItemService = orderItemService;
    }

    @PostMapping
    public ResponseEntity<OrderItem> createOrderItem(
            @RequestBody OrderItem orderItem) {

        return ResponseEntity.ok(
                orderItemService.createOrderItem(orderItem)
        );
    }

    @GetMapping
    public ResponseEntity<List<OrderItem>> getAllOrderItems() {
        return ResponseEntity.ok(
                orderItemService.getAllOrderItems()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderItem> getOrderItemById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                orderItemService.getOrderItemById(id)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderItem> updateOrderItem(
            @PathVariable Long id,
            @RequestBody OrderItem orderItem) {

        return ResponseEntity.ok(
                orderItemService.updateOrderItem(id, orderItem)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrderItem(
            @PathVariable Long id) {

        orderItemService.deleteOrderItem(id);

        return ResponseEntity.ok("Order item deleted successfully");
    }
}