package com.paintworks.paintworks.controller;

import com.paintworks.paintworks.model.User;
import com.paintworks.paintworks.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller to handle user registration and retrieval.
 */
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserRepository userRepo;

    @Autowired
    public UserController(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    /**
     * Register a new user.
     */
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public User registerUser(@RequestBody User user) {
        return userRepo.save(user); // NOTE: Password should be hashed before saving in production!
    }

    /**
     * Get all registered users.
     */
    @GetMapping
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }
}
