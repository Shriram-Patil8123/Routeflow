package com.routeflow.api.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.routeflow.api.entity.Warehouse;
import com.routeflow.api.repository.WarehouseRepository;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/warehouses")
public class WarehouseController {

    private final WarehouseRepository warehouseRepository;

    public WarehouseController(WarehouseRepository warehouseRepository) {
        this.warehouseRepository = warehouseRepository;
    }

    @PostMapping
    public Warehouse createWarehouse(@RequestBody Warehouse warehouse) {
        return warehouseRepository.save(warehouse);
    }

    @GetMapping
    public List<Warehouse> getAllWarehouses() {
        return warehouseRepository.findAll();
    }

    @GetMapping("/{id}")
    public Warehouse getWarehouseById(@PathVariable Long id) {
        return warehouseRepository.findById(id).orElseThrow();
    }

    @PutMapping("/{id}")
    public Warehouse updateWarehouse(
            @PathVariable Long id,
            @RequestBody Warehouse warehouse) {

        Warehouse existing = warehouseRepository.findById(id).orElseThrow();

        existing.setName(warehouse.getName());
        existing.setLocation(warehouse.getLocation());
        existing.setCapacity(warehouse.getCapacity());
        existing.setCurrentStock(warehouse.getCurrentStock());

        return warehouseRepository.save(existing);
    }

    @DeleteMapping("/{id}")
    public void deleteWarehouse(@PathVariable Long id) {
        warehouseRepository.deleteById(id);
    }
}