package com.paintworks.paintworks.repository;

import com.paintworks.paintworks.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;   // ✅ 1 - Add this
import java.util.List;  
@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserId(Long userId);
}