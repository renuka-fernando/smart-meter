package org.renuka.sms.account.service;

import org.renuka.sms.account.entity.Customer;
import org.renuka.sms.account.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {
    private CustomerRepository customerRepository;

    @Autowired
    public CustomerService(CustomerRepository customerRepository){
        this.customerRepository = customerRepository;
    }

    public Iterable<Customer> getCustomers() {
        return customerRepository.findAll();
    }
}
