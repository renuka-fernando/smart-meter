package org.renuka.sms.account.api;

import org.renuka.sms.account.constants.AccountConstants;
import org.renuka.sms.account.entity.Customer;
import org.renuka.sms.account.service.CustomerService;
import org.renuka.sms.common.dto.ErrorDTO;
import org.renuka.sms.common.exception.SmsResourceNotFoundException;
import org.renuka.sms.common.util.RestApiUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.HashMap;

@RestController
@RequestMapping("/customers")
public class CustomerAPI {

    private static final Logger logger = LoggerFactory.getLogger(CustomerAPI.class);
    private CustomerService customerService;

    @Autowired
    public CustomerAPI(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping
    public ResponseEntity<Page<Customer>> getCustomers(
            @RequestParam(value = "page", required = false, defaultValue = "0") Integer page,
            @RequestParam(value = "size", required = false, defaultValue = "20") Integer size,
            @RequestParam(value = "fname", required = false, defaultValue = "") String fname,
            @RequestParam(value = "lname", required = false, defaultValue = "") String lname) {
        return ResponseEntity.ok(customerService.getCustomers(page, size, fname, lname));
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity addCustomer(@RequestBody Customer customer) {
        Customer result = customerService.addCustomer(customer);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(result.getId()).toUri();
        return ResponseEntity.created(location).body(result);
    }

    @GetMapping("/{customerId}")
    public ResponseEntity getCustomerById(@PathVariable("customerId") Long customerId) {
        try {
            return ResponseEntity.ok(customerService.getCustomerById(customerId));
        } catch (SmsResourceNotFoundException e) {
            HashMap<String, String> params = new HashMap<>();
            params.put(AccountConstants.ExceptionsConstants.CUSTOMER_ID, customerId.toString());
            ErrorDTO errorDTO = RestApiUtil.getErrorDTO(e.getErrorHandler(), params);
            logger.error(e.getMessage(), e);

            return new ResponseEntity<>(errorDTO, HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(method = RequestMethod.PUT, path = "/{customerId}")
    public ResponseEntity updateCustomerById(@PathVariable("customerId") Long customerId,
                                             @RequestBody Customer customer) {
        try {
            return ResponseEntity.ok(customerService.updateCustomerById(customerId, customer));
        } catch (SmsResourceNotFoundException e) {
            HashMap<String, String> params = new HashMap<>();
            params.put(AccountConstants.ExceptionsConstants.CUSTOMER_ID, customerId.toString());
            ErrorDTO errorDTO = RestApiUtil.getErrorDTO(e.getErrorHandler(), params);
            logger.error(e.getMessage(), e);

            return new ResponseEntity<>(errorDTO, HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/{customerId}")
    public ResponseEntity deleteCustomerById(@PathVariable("customerId") Long customerId) {
        try {
            customerService.deleteCustomerById(customerId);
            return ResponseEntity.noContent().build();
        } catch (SmsResourceNotFoundException e) {
            HashMap<String, String> params = new HashMap<>();
            params.put(AccountConstants.ExceptionsConstants.CUSTOMER_ID, customerId.toString());
            ErrorDTO errorDTO = RestApiUtil.getErrorDTO(e.getErrorHandler(), params);
            logger.error(e.getMessage(), e);

            return new ResponseEntity<>(errorDTO, HttpStatus.NOT_FOUND);
        }

    }
}
