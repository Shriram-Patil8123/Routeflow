package com.routeflow.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.routeflow.api.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}