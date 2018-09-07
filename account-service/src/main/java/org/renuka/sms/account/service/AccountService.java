package org.renuka.sms.account.service;

import org.renuka.sms.account.entity.Account;
import org.renuka.sms.account.repository.AccountRepository;
import org.renuka.sms.common.exception.ExceptionCodes;
import org.renuka.sms.common.exception.SmsResourceNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountService {
    private AccountRepository accountRepository;
    private static final Logger logger = LoggerFactory.getLogger(AccountService.class);

    @Autowired
    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public Account getAccountById(Long accountId) throws SmsResourceNotFoundException {
        Optional<Account> result = accountRepository.findById(accountId);
        if (result.isPresent()) {
            return result.get();
        } else {
            throw new SmsResourceNotFoundException("Account not found : " + accountId,
                    ExceptionCodes.ACCOUNT_NOT_FOUND);
        }
    }

    public Account addAccount(Account account) throws SmsResourceNotFoundException {
        try {
            return accountRepository.save(account);
        } catch (DataIntegrityViolationException e) {
            throw new SmsResourceNotFoundException("Mentioned Resource Id is not matching with Existing Resources",
                    ExceptionCodes.INVALID_RESOURCE_ID);
        }
    }

    public Account updateAccount(Long accountId, Account account) throws SmsResourceNotFoundException {
        getAccountById(accountId); // check for existent and throw exception
        account.setId(accountId);
        return accountRepository.save(account);
    }

    public Page<Account> getAccounts(Integer page, Integer size) {
        return accountRepository.findAll(PageRequest.of(page, size));
    }
}
