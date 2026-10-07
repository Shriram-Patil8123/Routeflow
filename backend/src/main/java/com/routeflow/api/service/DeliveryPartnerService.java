package com.routeflow.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.routeflow.api.entity.DeliveryPartner;
import com.routeflow.api.repository.DeliveryPartnerRepository;

@Service
public class DeliveryPartnerService {

    private final DeliveryPartnerRepository deliveryPartnerRepository;

    public DeliveryPartnerService(
            DeliveryPartnerRepository deliveryPartnerRepository) {

        this.deliveryPartnerRepository = deliveryPartnerRepository;
    }

    public DeliveryPartner createDeliveryPartner(
            DeliveryPartner deliveryPartner) {

        return deliveryPartnerRepository.save(deliveryPartner);
    }

    public List<DeliveryPartner> getAllDeliveryPartners() {

        return deliveryPartnerRepository.findAll();
    }

    public DeliveryPartner getDeliveryPartnerById(Long id) {

        return deliveryPartnerRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Delivery partner not found"));
    }

    public DeliveryPartner updateDeliveryPartner(
            Long id,
            DeliveryPartner updatedPartner) {

        DeliveryPartner partner = getDeliveryPartnerById(id);

        partner.setName(updatedPartner.getName());
        partner.setPhone(updatedPartner.getPhone());
        partner.setEmail(updatedPartner.getEmail());
        partner.setVehicleNumber(updatedPartner.getVehicleNumber());
        partner.setStatus(updatedPartner.getStatus());
        partner.setCurrentLocation(updatedPartner.getCurrentLocation());

        return deliveryPartnerRepository.save(partner);
    }

    public void deleteDeliveryPartner(Long id) {

        deliveryPartnerRepository.deleteById(id);
    }
}