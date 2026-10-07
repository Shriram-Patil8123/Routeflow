package com.routeflow.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.routeflow.api.entity.Shipment;
import com.routeflow.api.repository.ShipmentRepository;

@Service
public class ShipmentService {

    private final ShipmentRepository shipmentRepository;

    public ShipmentService(ShipmentRepository shipmentRepository) {
        this.shipmentRepository = shipmentRepository;
    }

    public Shipment createShipment(Shipment shipment) {
        return shipmentRepository.save(shipment);
    }

    public List<Shipment> getAllShipments() {
        return shipmentRepository.findAll();
    }

    public Shipment getShipmentById(Long id) {
        return shipmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Shipment not found"));
    }

    public Shipment getShipmentByTrackingNumber(String trackingNumber) {
        return shipmentRepository.findByTrackingNumber(trackingNumber)
                .orElseThrow(() -> new RuntimeException("Shipment not found"));
    }

    public Shipment updateShipment(Long id, Shipment updatedShipment) {

        Shipment shipment = getShipmentById(id);

        shipment.setTrackingNumber(updatedShipment.getTrackingNumber());
        shipment.setOrderId(updatedShipment.getOrderId());
        shipment.setStatus(updatedShipment.getStatus());
        shipment.setWarehouse(updatedShipment.getWarehouse());
        shipment.setDeliveryPartnerId(updatedShipment.getDeliveryPartnerId());
        shipment.setEstimatedDelivery(updatedShipment.getEstimatedDelivery());

        return shipmentRepository.save(shipment);
    }

    public void deleteShipment(Long id) {
        shipmentRepository.deleteById(id);
    }
}