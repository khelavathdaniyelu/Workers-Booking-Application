package com.paintworks.paintworks.controller;

import com.paintworks.paintworks.model.LoginRequest;
import com.paintworks.paintworks.model.User;
import com.paintworks.paintworks.service.AuthService;
import com.paintworks.paintworks.service.UserService;
import com.paintworks.paintworks.config.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;  // ✅ You forgot this import — needed for Principal
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthService authService;
    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public AuthController(AuthService authService, UserService userService, JwtTokenProvider jwtTokenProvider) {
        this.authService = authService;
        this.userService = userService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            String response = authService.registerUser(user);
            return ResponseEntity.ok(Map.of("message", response));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "❌ Error registering user: " + e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            User user = authService.authenticateUser(loginRequest);

            // Generate JWT token
            String token = jwtTokenProvider.createToken(user);

            // Prepare the response
            Map<String, Object> response = new HashMap<>();
            response.put("message", "✅ Login successful!");
            response.put("token", token);
            response.put("id", user.getId());
            response.put("username", user.getUsername());
            response.put("email", user.getEmail());

            return ResponseEntity.ok(response);
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "❌ Invalid email or password."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "❌ Login failed: " + e.getMessage()));
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("message", "❌ User not authenticated"));
        }

        String usernameOrEmail = authentication.getName();
        System.out.println("Authenticated username/email: " + usernameOrEmail);  // Typically, this is email or username

        // Fetch user from database based on email or username
        Optional<User> userOpt = userService.getUserByEmail(usernameOrEmail);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "❌ User not found"));
        }

        User user = userOpt.get();

        Map<String, Object> userProfile = new HashMap<>();
        userProfile.put("id", user.getId());
        userProfile.put("username", user.getUsername());
        userProfile.put("email", user.getEmail());

        return ResponseEntity.ok(userProfile);
    }

   @PutMapping("/profile")
public ResponseEntity<?> updateProfile(@RequestBody Map<String, String> payload) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    if (authentication == null || !authentication.isAuthenticated()) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(Map.of("message", "❌ User not authenticated"));
    }

    String usernameOrEmail = authentication.getName(); // Extracted from JWT
    String newUsername = payload.get("username");

    if (newUsername == null || newUsername.trim().isEmpty()) {
        return ResponseEntity.badRequest().body(Map.of("message", "❌ Username cannot be empty"));
    }

    // Get user by email or username
    User user = userService.getUserByUsernameOrEmail(usernameOrEmail);
    if (user == null) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "❌ User not found"));
    }

    // Update only username
    User updatedUser = userService.updateUsername(user.getId(), newUsername);

    // Don’t send password in response
    updatedUser.setPassword(null);

    // Return only relevant user fields (not full entity)
    Map<String, Object> userProfile = new HashMap<>();
    userProfile.put("id", updatedUser.getId());
    userProfile.put("username", updatedUser.getUsername());
    userProfile.put("email", updatedUser.getEmail());

    return ResponseEntity.ok(userProfile);
}

}
