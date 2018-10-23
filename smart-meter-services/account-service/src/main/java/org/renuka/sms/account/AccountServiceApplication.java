package org.renuka.sms.account;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.util.List;

@SpringBootApplication
public class AccountServiceApplication {
    @Value("#{'${sms.cors.allowedorigin}'.split(',')}")
    private List<String> allowedOrigins;

    public static void main(String[] args) {
        SpringApplication.run(AccountServiceApplication.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurerAdapter() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                String[] originsArray = new String[allowedOrigins.size()];
                allowedOrigins.toArray(originsArray);
                registry.addMapping("/**").allowedOrigins(originsArray);
            }
        };
    }
}
