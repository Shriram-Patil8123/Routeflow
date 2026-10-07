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

import com.routeflow.api.entity.DeliveryPartner;
import com.routeflow.api.service.DeliveryPartnerService;

@RestController
@RequestMapping("/api/delivery-partners")
@CrossOrigin(origins = "http://localhost:5173")
public class DeliveryPartnerController {

    private final DeliveryPartnerService deliveryPartnerService;

    public DeliveryPartnerController(
            DeliveryPartnerService deliveryPartnerService) {

        this.deliveryPartnerService = deliveryPartnerService;
    }

    @PostMapping
    public ResponseEntity<DeliveryPartner> createDeliveryPartner(
            @RequestBody DeliveryPartner deliveryPartner) {

        return ResponseEntity.ok(
                deliveryPartnerService.createDeliveryPartner(deliveryPartner)
        );
    }

    @GetMapping
    public ResponseEntity<List<DeliveryPartner>> getAllDeliveryPartners() {

        return ResponseEntity.ok(
                deliveryPartnerService.getAllDeliveryPartners()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<DeliveryPartner> getDeliveryPartnerById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                deliveryPartnerService.getDeliveryPartnerById(id)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<DeliveryPartner> updateDeliveryPartner(
            @PathVariable Long id,
            @RequestBody DeliveryPartner deliveryPartner) {

        return ResponseEntity.ok(
                deliveryPartnerService.updateDeliveryPartner(
                        id,
                        deliveryPartner
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDeliveryPartner(
            @PathVariable Long id) {

        deliveryPartnerService.deleteDeliveryPartner(id);

        return ResponseEntity.ok(
                "Delivery partner deleted successfully"
        );
    }
}