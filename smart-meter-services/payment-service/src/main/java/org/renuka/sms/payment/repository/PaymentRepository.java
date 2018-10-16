package org.renuka.sms.payment.repository;

import org.renuka.sms.payment.entity.Payment;
import org.springframework.data.repository.CrudRepository;

public interface PaymentRepository extends CrudRepository<Payment, Long> {
}
