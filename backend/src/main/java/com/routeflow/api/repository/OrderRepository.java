package com.routeflow.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.routeflow.api.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
}