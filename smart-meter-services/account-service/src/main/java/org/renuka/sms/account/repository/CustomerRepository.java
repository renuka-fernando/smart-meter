package org.renuka.sms.account.repository;

import org.renuka.sms.account.entity.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

public interface CustomerRepository extends CrudRepository<Customer, Long> {

    Page<Customer> findAll(Pageable pageable);

    Page<Customer> findCustomerByFnameContainsAndLnameContains(String fname, String lname, Pageable pageable);

}
