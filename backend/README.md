# Backend (Spring Boot) — HDV Monorepo

This folder hosts the Java Spring Boot backend for the Education Platform. We keep a monorepo structure:

- frontend: React + Vite (current project at repository root)
- backend: Spring Boot 3 (this folder)

## 1) Generate the project via Spring Initializr

Use Spring Initializr to create a project and extract it into this `backend/` folder.

Recommended settings:
- Language: Java 17+
- Build: Gradle (Kotlin) or Maven (your choice)
- Packaging: Jar
- Group: com.hdv
- Artifact: server
- Name: hdv-server
- Dependencies:
  - Spring Web
  - Spring Security
  - Validation
  - Spring Data JPA
  - PostgreSQL Driver
  - Flyway Migration
  - Spring Mail
  - WebSocket
  - Actuator
  - springdoc-openapi-starter-webmvc-ui

After downloading the ZIP, unzip its contents directly into `backend/` so that `backend/build.gradle` or `backend/pom.xml` is at this path.

## 2) Local development

Prerequisites:
- Java 17+
- Postgres (local or docker)

Environment variables (example):
```
SPRING_PROFILES_ACTIVE=dev
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/edu
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=postgres
JWT_SECRET=change-me-please
MAIL_HOST=localhost
MAIL_PORT=1025
```

application.yml (sample skeleton):
```
spring:
  datasource:
    url: ${SPRING_DATASOURCE_URL}
    username: ${SPRING_DATASOURCE_USERNAME}
    password: ${SPRING_DATASOURCE_PASSWORD}
  jpa:
    hibernate:
      ddl-auto: validate
    properties:
      hibernate:
        format_sql: true
  flyway:
    enabled: true
    locations: classpath:db/migration
  mvc:
    pathmatch:
      matching-strategy: ant_path_matcher

server:
  port: 8080

# CORS for Vite dev
app:
  cors:
    allowed-origins:
      - http://localhost:5173
```

CORS config example (Java):
```
@Bean
public WebMvcConfigurer corsConfigurer(@Value("${app.cors.allowed-origins}") List<String> origins) {
  return new WebMvcConfigurer() {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
      registry.addMapping("/api/**")
        .allowedOrigins(origins.toArray(String[]::new))
        .allowedMethods("GET","POST","PUT","PATCH","DELETE")
        .allowCredentials(true);
    }
  };
}
```

## 3) Suggested module (package) layout

- com.hdv.auth
- com.hdv.catalog (courses, lessons, resources)
- com.hdv.learning (enrollment, progress, notes)
- com.hdv.checkout (cart, order)
- com.hdv.notifications
- com.hdv.teacher (management, announcements)
- com.hdv.admin
- com.hdv.shared (common utils, exceptions, security config)

## 4) Database & migrations (Flyway)

Create Flyway scripts under `src/main/resources/db/migration/`:
- V1__init.sql: tables for user, role, course, lesson, resource, enrollment, note, progress, cart_item, order, notification
- Seed roles + first admin

Run dev Postgres quickly with Docker (optional):
```
docker run --name edupg -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=edu -p 5432:5432 -d postgres:16
```

## 5) OpenAPI & testing

- Add `springdoc-openapi` starter; Swagger UI available at `/swagger-ui.html`
- Use JUnit 5 + Testcontainers (Postgres) for integration tests

## 6) Frontend integration

- Frontend runs on http://localhost:5173 (Vite)
- Backend runs on http://localhost:8080
- Replace localStorage mocks incrementally:
  - Auth: /api/auth/login, /api/auth/refresh, /api/users/me
  - Catalog: /api/courses, /api/courses/{id}
  - Cart & Checkout: /api/me/cart, /api/orders/checkout
  - Learning: /api/me/courses, progress, notes
  - Notifications: /api/me/notifications
  - Announcements (teacher): /api/announcements

## 7) CI/CD and Docker

- Add Dockerfile and docker-compose (backend + Postgres + Mailhog)
- GitHub Actions: build + test; run Flyway migrations on deploy

---
Next step: Generate the Spring Boot project via Initializr and extract it into this `backend/` folder. Then we’ll implement Auth + Catalog read-only first to connect the React app.