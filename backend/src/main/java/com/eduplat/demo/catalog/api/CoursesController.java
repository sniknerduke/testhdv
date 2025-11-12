package com.eduplat.demo.catalog.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.HttpStatus;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/courses")
public class CoursesController {

    private static final List<CourseDto> SAMPLE = new ArrayList<>(Arrays.asList(
        new CourseDto(UUID.fromString("11111111-1111-1111-1111-111111111111"),
                    "React cơ bản", new BigDecimal("399000"), "Nguyễn Văn A",
                    "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1200&auto=format&fit=crop"),
            new CourseDto(UUID.fromString("22222222-2222-2222-2222-222222222222"),
                    "Node.js nâng cao", new BigDecimal("499000"), "Trần Thị B",
                    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop"),
            new CourseDto(UUID.fromString("33333333-3333-3333-3333-333333333333"),
                    "TypeScript thực chiến", new BigDecimal("299000"), "Lê Văn C",
                    "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop")
    ));

    @GetMapping
    public ResponseEntity<List<CourseDto>> list() {
        return ResponseEntity.ok(SAMPLE);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourseDto> get(@PathVariable("id") UUID id) {
        Optional<CourseDto> course = SAMPLE.stream().filter(c -> c.id().equals(id)).findFirst();
        return course.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<CourseDto> create(@RequestBody CreateCourseRequest req) {
        if (req == null || req.title() == null || req.title().isBlank()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        UUID id = UUID.randomUUID();
        BigDecimal price = req.price() != null ? req.price() : BigDecimal.ZERO;
        CourseDto created = new CourseDto(id, req.title(), price, req.instructor(), req.image());
        SAMPLE.add(created);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    public static record CreateCourseRequest(String title, BigDecimal price, String instructor, String image) {}
}
