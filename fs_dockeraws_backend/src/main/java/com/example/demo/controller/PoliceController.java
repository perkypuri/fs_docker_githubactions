package com.example.demo.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Police;
import com.example.demo.service.PoliceService;

@RestController
@RequestMapping("/")   // root
@CrossOrigin(origins = "*")
public class PoliceController {

    @Autowired
    private PoliceService policeService;

    @PostMapping("/add")
    public Police addPolice(@RequestBody Police p) {
        return policeService.addPolice(p);
    }

    @GetMapping("/view")
    public List<Police> viewAll() {
        return policeService.viewAllPolice();
    }

    @GetMapping("/get/{id}")
    public Police getById(@PathVariable int id) {
        return policeService.getPoliceById(id);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteById(@PathVariable int id) {
        policeService.deletePolice(id);
        return "Police with ID " + id + " deleted successfully!";
    }

    @PutMapping("/update")
    public Police updatePolice(@RequestBody Police p) {
        return policeService.updatePolice(p);
    }
}
