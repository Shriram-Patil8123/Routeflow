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

import com.routeflow.api.entity.TrackingEvent;
import com.routeflow.api.service.TrackingEventService;

@RestController
@RequestMapping("/api/tracking-events")
@CrossOrigin(origins = "http://localhost:5173")
public class TrackingEventController {

    private final TrackingEventService trackingEventService;

    public TrackingEventController(TrackingEventService trackingEventService) {
        this.trackingEventService = trackingEventService;
    }

    @PostMapping
    public ResponseEntity<TrackingEvent> createTrackingEvent(
            @RequestBody TrackingEvent event) {

        return ResponseEntity.ok(
                trackingEventService.createTrackingEvent(event)
        );
    }

    @GetMapping
    public ResponseEntity<List<TrackingEvent>> getAllTrackingEvents() {

        return ResponseEntity.ok(
                trackingEventService.getAllTrackingEvents()
        );
    }

    @GetMapping("/shipment/{shipmentId}")
    public ResponseEntity<List<TrackingEvent>> getEventsByShipment(
            @PathVariable Long shipmentId) {

        return ResponseEntity.ok(
                trackingEventService.getEventsByShipment(shipmentId)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<TrackingEvent> getTrackingEventById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                trackingEventService.getTrackingEventById(id)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<TrackingEvent> updateTrackingEvent(
            @PathVariable Long id,
            @RequestBody TrackingEvent event) {

        return ResponseEntity.ok(
                trackingEventService.updateTrackingEvent(id, event)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTrackingEvent(
            @PathVariable Long id) {

        trackingEventService.deleteTrackingEvent(id);

        return ResponseEntity.ok("Tracking event deleted successfully");
    }
}