package org.renuka.sms.reading;

import org.apache.activemq.ActiveMQConnectionFactory;
import org.renuka.sms.common.constants.CommonConstants;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import javax.jms.ConnectionFactory;
import java.util.List;

@SpringBootApplication
public class MeterReadingServiceApplication {
    private String jsmUrl = CommonConstants.JMS_URL;

    @Value("#{'${sms.cors.allowedorigin}'.split(',')}")
    private List<String> allowedOrigins;

    public static void main(String[] args) {
        SpringApplication.run(MeterReadingServiceApplication.class, args);
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

    @Bean
    public ConnectionFactory jsmConnectionFactory() {
        return new ActiveMQConnectionFactory(jsmUrl);
    }
}
