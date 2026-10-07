package com.routeflow.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.routeflow.api.entity.TrackingEvent;

public interface TrackingEventRepository extends JpaRepository<TrackingEvent, Long> {

    List<TrackingEvent> findByShipmentId(Long shipmentId);
}