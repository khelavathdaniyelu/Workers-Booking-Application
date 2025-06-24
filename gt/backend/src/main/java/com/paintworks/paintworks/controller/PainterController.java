package com.paintworks.paintworks.controller;

import com.paintworks.paintworks.model.Painter;
import com.paintworks.paintworks.repository.PainterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller to handle CRUD operations for Painters.
 */
@RestController
@RequestMapping("/api/painters")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend access
public class PainterController {

    private final PainterRepository painterRepo;

    @Autowired
    public PainterController(PainterRepository painterRepo) {
        this.painterRepo = painterRepo;
    }

    /**
     * Get all painters from the database.
     */
    @GetMapping
    public List<Painter> getAllPainters() {
        return painterRepo.findAll();
    }

    /**
     * Create a new painter.
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Painter createPainter(@RequestBody Painter painter) {
        return painterRepo.save(painter);
    }

    /**
     * Delete a painter by ID.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePainter(@PathVariable Long id) {
        if (!painterRepo.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Painter not found.");
        }

        painterRepo.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
