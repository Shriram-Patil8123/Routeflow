package com.routeflow.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.routeflow.api.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
}