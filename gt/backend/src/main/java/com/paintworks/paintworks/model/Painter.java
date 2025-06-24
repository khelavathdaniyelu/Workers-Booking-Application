package com.paintworks.paintworks.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.List;

@Entity
public class Painter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
   // private String specialty;
    private String expertise;
    private String location;  // New field for location
    private String phone;     // New field for contact number

    @OneToMany(mappedBy = "painter", cascade = CascadeType.ALL)
    @JsonIgnore // Prevent circular reference
    private List<Booking> bookings;

    // Getters and setters
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

   /* public String getSpecialty() {
        return specialty;
    }*/
   public String getExpertise() {
    return expertise;
    }


    public String getLocation() {
        return location;  // Getter for location
    }

    public String getPhone() {
        return phone;  // Getter for phone
    }

    public List<Booking> getBookings() {
        return bookings;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    /*public void setSpecialty(String specialty) {
        this.specialty = specialty;
    }*/
   public void setExpertise(String expertise) {
    this.expertise = expertise;
     }

    public void setLocation(String location) {  // Setter for location
        this.location = location;
    }

    public void setPhone(String phone) {  // Setter for phone
        this.phone = phone;
    }

    public void setBookings(List<Booking> bookings) {
        this.bookings = bookings;
    }
}
