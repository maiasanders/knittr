package com.knittr.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication
public class KnittrApplication {

	public static void main(String[] args) {
		SpringApplication.run(KnittrApplication.class, args);
	}

}
