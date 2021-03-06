package com.example.mediservapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@EnableMongoAuditing
@SpringBootApplication
public class MediServApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(MediServApiApplication.class, args);
	}
}
