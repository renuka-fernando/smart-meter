package org.renuka.sms.payment.repository;

import org.renuka.sms.payment.entity.Bill;
import org.springframework.data.repository.CrudRepository;

public interface BillRepository extends CrudRepository<Bill, Long> {
}
