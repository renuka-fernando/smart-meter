package org.renuka.sms.account.service;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;
import org.renuka.sms.account.entity.Customer;
import org.renuka.sms.account.repository.CustomerRepository;
import org.renuka.sms.common.exception.SmsResourceNotFoundException;

import java.util.Optional;

public class CustomerServiceTest {
    private CustomerRepository customerRepository;

    @Before
    public void setup(){
        customerRepository = Mockito.mock(CustomerRepository.class);
    }

    @Test
    public void getCustomerByIdTest(){
        Customer customer = getNewMockCustomer();
        Optional<Customer> optionalCustomer = Optional.of(customer);

        // Happy Path
        Mockito.when(customerRepository.findById(12L)).thenReturn(optionalCustomer);
        CustomerService customerService = new CustomerService(customerRepository);
        try {
            Customer customerById = customerService.getCustomerById(12L);
            Assert.assertEquals(customer.getAddress_line1(), customerById.getAddress_line1());
            Assert.assertEquals(customer.getAddress_line2(), customerById.getAddress_line2());
            Assert.assertEquals(customer.getCity(), customerById.getCity());
            Assert.assertEquals(customer.getContactNo(), customerById.getContactNo());
            Assert.assertEquals(customer.getEmail(), customerById.getEmail());
            Assert.assertEquals(customer.getFname(), customerById.getFname());
            Assert.assertEquals(customer.getLname(), customerById.getLname());
            Assert.assertEquals(customer.getId(), customerById.getId());
            Assert.assertEquals(customer.getPassword(), customerById.getPassword());
        } catch (SmsResourceNotFoundException e) {
            Assert.fail();
        }
    }

    private Customer getNewMockCustomer(){
        Customer customer = new Customer();
        customer.setAddress_line1("NO 554/A");
        customer.setAddress_line2("Panadura Road");
        customer.setCity("Bandaragama");
        customer.setFname("Renuka");
        customer.setLname("Fernando");
        customer.setId(12L);
        customer.setEmail("renuka@xxxx.com");
        customer.setContactNo("0777000000");
        customer.setPassword("XXXX");
        return customer;
    }
}
