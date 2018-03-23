package org.renuka.sms.account.repository;

import org.renuka.sms.account.entity.Customer;
import org.springframework.data.repository.CrudRepository;

public interface CustomerRepository extends CrudRepository<Customer, Long> {
}
