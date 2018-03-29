package org.renuka.sms.payment.service;

import org.renuka.sms.payment.entity.Bill;
import org.renuka.sms.payment.repository.BillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {
    private BillRepository billRepository;

    @Autowired
    public PaymentService(BillRepository billRepository) {
        this.billRepository = billRepository;
    }

    public Bill createBill(Bill bill) {
        return billRepository.save(bill);
    }
}
