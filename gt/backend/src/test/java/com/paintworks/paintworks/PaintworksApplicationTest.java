package com.paintworks.paintworks;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

/**
 * Main entry point for the Paintworks Booking Application.
 */
@SpringBootApplication
@ComponentScan(basePackages = "com.paintworks.paintworks")
public class PaintworksApplicationTest {

    public static void main(String[] args) {
        SpringApplication.run(PaintworksApplication.class, args);
    }
} 
