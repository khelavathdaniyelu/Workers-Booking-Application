package com.paintworks.paintworks.repository;

import com.paintworks.paintworks.model.Painter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PainterRepository extends JpaRepository<Painter, Long> {
}
