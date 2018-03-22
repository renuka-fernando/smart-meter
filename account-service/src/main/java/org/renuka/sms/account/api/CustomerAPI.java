package org.renuka.sms.account.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/customers")
public class CustomerAPI {
    @GetMapping
    public String hello(){
        return "Hello Renuka!";
    }
}



