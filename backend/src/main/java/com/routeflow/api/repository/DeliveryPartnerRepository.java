package com.routeflow.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.routeflow.api.entity.DeliveryPartner;

public interface DeliveryPartnerRepository
        extends JpaRepository<DeliveryPartner, Long> {

    Optional<DeliveryPartner> findByPhone(String phone);

    Optional<DeliveryPartner> findByEmail(String email);
}