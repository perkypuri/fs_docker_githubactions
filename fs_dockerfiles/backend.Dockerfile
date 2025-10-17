# Stage 1: Build
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app

# Install bash and git
RUN apk add --no-cache bash git

# Copy Maven wrapper and pom
COPY mvnw pom.xml ./
COPY .mvn .mvn

# Make wrapper executable
RUN chmod +x mvnw

# Copy source code
COPY src ./src

# Build the app
RUN ./mvnw clean package -DskipTests

# Stage 2: Run the app
FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 2000
CMD ["java", "-jar", "app.jar"]
