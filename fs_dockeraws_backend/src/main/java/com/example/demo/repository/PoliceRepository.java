package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.Police;

public interface PoliceRepository extends JpaRepository<Police, Integer> {

}
