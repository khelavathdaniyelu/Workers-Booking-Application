package com.paintworks.paintworks.config;

import com.paintworks.paintworks.model.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {

    @Value("${jwt.expiration-time}")
    private long expirationTime;  // Token expiration time (in milliseconds)

    // Secure 256-bit key for HS256 (generated at startup and stays same in-memory)
    private final Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    // Method to create JWT token
    public String createToken(User user) {
        return Jwts.builder()
                .setSubject(user.getEmail())  // Set email as subject
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }

    // Extract username/email from token
    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    // Validate token (expiry + signature)
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            // Token invalid, expired or tampered
            return false;
        }
    }
}
