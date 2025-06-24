package com.paintworks.paintworks;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.paintworks")  // Ensure this line is correct
public class PaintworksApplication {

    public static void main(String[] args) {
        SpringApplication.run(PaintworksApplication.class, args);
    }
}
