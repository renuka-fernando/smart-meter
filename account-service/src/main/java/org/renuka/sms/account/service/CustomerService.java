package org.renuka.sms.account.service;

import org.renuka.sms.account.entity.Customer;
import org.renuka.sms.account.repository.CustomerRepository;
import org.renuka.sms.common.exception.ExceptionCodes;
import org.renuka.sms.common.exception.SmsResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerService {
    private CustomerRepository customerRepository;

    @Autowired
    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public Page<Customer> getCustomers(Integer page, Integer size, String fname, String lname) {
        if (page == null) page = 0;
        if (size == null) size = 20;
        if (fname == null) fname = "";
        if (lname == null) lname = "";
        return customerRepository.findCustomerByFnameContainsAndLnameContains(fname, lname,
                PageRequest.of(page, size));
    }

    public Customer addCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    public Customer getCustomerById(Long customerId) throws SmsResourceNotFoundException {
        Optional<Customer> result = customerRepository.findById(customerId);
        if (result.isPresent()) {
            return result.get();
        } else {
            throw new SmsResourceNotFoundException("Customer not found : " + customerId,
                    ExceptionCodes.METER_READING_NOT_FOUND);
        }
    }
}
