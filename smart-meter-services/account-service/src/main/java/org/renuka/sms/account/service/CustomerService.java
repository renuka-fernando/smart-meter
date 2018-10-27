package org.renuka.sms.account.service;

import org.renuka.sms.account.dto.CustomerDTO;
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

    public Page<Customer> getCustomers(Integer page, Integer size, String fName, String lName) {
        return customerRepository.findCustomerByFnameContainsAndLnameContains(fName, lName,
                PageRequest.of(page, size));
    }

    public Customer addCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    public CustomerDTO getCustomerById(Long customerId) throws SmsResourceNotFoundException {
        Optional<Customer> result = customerRepository.findById(customerId);
        if (result.isPresent()) {
            return CustomerDTO.build(result.get());
        } else {
            throw new SmsResourceNotFoundException("Customer not found : " + customerId,
                    ExceptionCodes.CUSTOMER_NOT_FOUND);
        }
    }

    public void deleteCustomerById(Long customerId) throws SmsResourceNotFoundException {
        getCustomerById(customerId); // check for existent and throw exception
        customerRepository.deleteById(customerId);
    }

    public Customer updateCustomerById(Long customerId, Customer customer) throws SmsResourceNotFoundException {
        getCustomerById(customerId); // check for existent and throw exception
        customer.setId(customerId);
        return customerRepository.save(customer);
    }
}
