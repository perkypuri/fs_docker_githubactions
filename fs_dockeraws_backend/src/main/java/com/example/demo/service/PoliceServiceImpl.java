package com.example.demo.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.model.Police;
import com.example.demo.repository.PoliceRepository;

@Service
public class PoliceServiceImpl implements PoliceService {

    @Autowired
    private PoliceRepository policeRepository;

    @Override
    public Police addPolice(Police p) {
        return policeRepository.save(p);
    }

    @Override
    public List<Police> viewAllPolice() {
        return policeRepository.findAll();
    }

    @Override
    public Police getPoliceById(int id) {
        return policeRepository.findById(id).orElse(null);
    }

    @Override
    public void deletePolice(int id) {
        policeRepository.deleteById(id);
    }

    @Override
    public Police updatePolice(Police p) {
        return policeRepository.save(p);
    }
}
