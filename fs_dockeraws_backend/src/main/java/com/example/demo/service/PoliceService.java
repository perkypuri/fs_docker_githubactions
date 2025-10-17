package com.example.demo.service;

import java.util.List;
import com.example.demo.model.Police;

public interface PoliceService {
    public Police addPolice(Police p);
    public List<Police> viewAllPolice();
    public Police getPoliceById(int id);
    public void deletePolice(int id);
    public Police updatePolice(Police p);
}
