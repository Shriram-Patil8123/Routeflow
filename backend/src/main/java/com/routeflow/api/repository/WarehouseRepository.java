package com.routeflow.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.routeflow.api.entity.Warehouse;

public interface WarehouseRepository extends JpaRepository<Warehouse, Long> {
}