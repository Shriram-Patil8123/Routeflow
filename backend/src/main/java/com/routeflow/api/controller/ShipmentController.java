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

import com.routeflow.api.entity.Shipment;
import com.routeflow.api.service.ShipmentService;

@RestController
@RequestMapping("/api/shipments")
@CrossOrigin(origins = "http://localhost:5173")
public class ShipmentController {

    private final ShipmentService shipmentService;

    public ShipmentController(ShipmentService shipmentService) {
        this.shipmentService = shipmentService;
    }

    @PostMapping
    public ResponseEntity<Shipment> createShipment(
            @RequestBody Shipment shipment) {

        return ResponseEntity.ok(
                shipmentService.createShipment(shipment)
        );
    }

    @GetMapping
    public ResponseEntity<List<Shipment>> getAllShipments() {
        return ResponseEntity.ok(
                shipmentService.getAllShipments()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Shipment> getShipmentById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                shipmentService.getShipmentById(id)
        );
    }

    @GetMapping("/tracking/{trackingNumber}")
    public ResponseEntity<Shipment> getShipmentByTrackingNumber(
            @PathVariable String trackingNumber) {

        return ResponseEntity.ok(
                shipmentService.getShipmentByTrackingNumber(trackingNumber)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Shipment> updateShipment(
            @PathVariable Long id,
            @RequestBody Shipment shipment) {

        return ResponseEntity.ok(
                shipmentService.updateShipment(id, shipment)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteShipment(
            @PathVariable Long id) {

        shipmentService.deleteShipment(id);

        return ResponseEntity.ok("Shipment deleted successfully");
    }
}