package com.paintworks.paintworks.service;

import com.paintworks.paintworks.model.User;
import com.paintworks.paintworks.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Register a new user
    public String registerUser(User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser.isPresent()) {
            return "Email already registered.";
        }

        // Encode password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return "User registered successfully.";
    }

    // Get user by email
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // NEW: Get user by username OR email (used in /profile endpoint)
    public User getUserByUsernameOrEmail(String input) {
        return userRepository.findByEmail(input)
                .or(() -> userRepository.findByUsername(input)) // Java 8 Optional fallback
                .orElse(null);
    }

    // NEW: Save user (used for updating profile)
    public User saveUser(User user) {
        return userRepository.save(user);
    }
    // NEW: Update only the username (leave password unchanged)
public User updateUsername(Long userId, String newUsername) {
    Optional<User> existingUserOpt = userRepository.findById(userId);

    if (existingUserOpt.isEmpty()) {
        throw new RuntimeException("User not found");
    }

    User existingUser = existingUserOpt.get();
    existingUser.setUsername(newUsername);

    return userRepository.save(existingUser);
}

}
