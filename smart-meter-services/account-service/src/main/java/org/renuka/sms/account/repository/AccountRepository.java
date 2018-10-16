package org.renuka.sms.account.repository;

import org.renuka.sms.account.entity.Account;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

public interface AccountRepository extends CrudRepository<Account, Long> {
    Page<Account> findAll(Pageable pageable);
}
