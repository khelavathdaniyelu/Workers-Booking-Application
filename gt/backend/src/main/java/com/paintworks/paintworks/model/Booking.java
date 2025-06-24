package com.paintworks.paintworks.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String clientName;

    @NotNull
    private String date;

    @NotNull
    private String status;

    @ManyToOne(fetch = FetchType.EAGER) // EAGER to avoid LazyInitializationException
    @JoinColumn(name = "painter_id")
    @JsonIgnoreProperties("bookings") // Avoid circular reference
    private Painter painter;

    // Getters and setters
    public Long getId() {
        return id;
    }

    public String getClientName() {
        return clientName;
    }

    public String getDate() {
        return date;
    }

    public String getStatus() {
        return status;
    }

    public Painter getPainter() {
        return painter;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setPainter(Painter painter) {
        this.painter = painter;
    }

     @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // getters/setters
    public User getUser() {
    return user;
}

public void setUser(User user) {
    this.user = user;
}
 
}
