package com.routeflow.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.routeflow.api.entity.TrackingEvent;
import com.routeflow.api.repository.TrackingEventRepository;

@Service
public class TrackingEventService {

    private final TrackingEventRepository trackingEventRepository;

    public TrackingEventService(TrackingEventRepository trackingEventRepository) {
        this.trackingEventRepository = trackingEventRepository;
    }

    public TrackingEvent createTrackingEvent(TrackingEvent event) {
        return trackingEventRepository.save(event);
    }

    public List<TrackingEvent> getAllTrackingEvents() {
        return trackingEventRepository.findAll();
    }

    public TrackingEvent getTrackingEventById(Long id) {
        return trackingEventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tracking event not found"));
    }

    public List<TrackingEvent> getEventsByShipment(Long shipmentId) {
        return trackingEventRepository.findByShipmentId(shipmentId);
    }

    public TrackingEvent updateTrackingEvent(
            Long id,
            TrackingEvent updatedEvent) {

        TrackingEvent event = getTrackingEventById(id);

        event.setShipmentId(updatedEvent.getShipmentId());
        event.setStatus(updatedEvent.getStatus());
        event.setLocation(updatedEvent.getLocation());
        event.setDescription(updatedEvent.getDescription());
        event.setEventTime(updatedEvent.getEventTime());

        return trackingEventRepository.save(event);
    }

    public void deleteTrackingEvent(Long id) {
        trackingEventRepository.deleteById(id);
    }
}