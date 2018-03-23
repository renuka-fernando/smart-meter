package org.renuka.sms.account.api;

import org.renuka.sms.account.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/customers")
public class CustomerAPI {
    private CustomerService customerService;

    @Autowired
    public CustomerAPI(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping
    public String hello() {
        return customerService.hello();
    }
}



