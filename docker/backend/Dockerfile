#Build stage
FROM maven:3.8.7-openjdk-18 AS build
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
#RUN mvn clean install spring-boot:repackage
RUN mvn clean package -DskipTests

#Runtime stage
FROM amazoncorretto:17
#define few things
ARG PROFILE=dev
ARG APP_VERSION=1.0.5
ARG POST_USERNAME=missing_user_name
ARG POST_PASSWORD=missing_password
ARG DB=jdbc:postgresql://book-social-network.postgres.database.azure.com:5432/book_social_network
ARG E_HOSTNAME=smtp.gmail.com
ARG E_USERNAME=richespsan.210@gmail.com
ARG E_PASSWORD=missing_password

WORKDIR /app
COPY --from=build /build/target/book-network-*.jar /app/

EXPOSE 8088


ENV DB_URL=${DB}
ENV ACTIVE_PROFILE=${PROFILE}
ENV JAR_VERSION=${APP_VERSION}
ENV EMAIL_HOSTNAME=${E_HOSTNAME}
ENV EMAIL_USERNAME=${E_USERNAME}
ENV EMAIL_PASSWORD=${E_PASSWORD}
ENV POSTGRESQL_USERNAME=${POST_USERNAME}
ENV POSTGRESQL_PASSWORD=${POST_PASSWORD}


CMD java -jar -Dspring.profile.active=${ACTIVE_PROFILE} -Dspring.datasource.url=${DB_URL} book-network-${JAR_VERSION}.jar 