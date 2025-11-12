package com.eduplat.demo.catalog.api;

import java.math.BigDecimal;
import java.util.UUID;

public record CourseDto(
        UUID id,
        String title,
        BigDecimal price,
        String instructor,
        String image
) {}
