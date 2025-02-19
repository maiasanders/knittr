package com.knittr.api.apidoc;

import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.models.OpenAPI;

@Configuration
public class ApiDocConfig {

    @Bean
    public OpenAPI MyAPI() {
        final String apiTitle = "Knittr API";


        return new OpenAPI()
                .info(new Info().title(apiTitle)
                        .description("REST API for Knittr app")
                        .version("v0.0.1")
                        .license(new License().name("Apache 2.0").url("http://springdoc.org"))
                );

    }
}
