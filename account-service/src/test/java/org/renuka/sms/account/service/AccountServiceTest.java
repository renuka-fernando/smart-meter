package org.renuka.sms.account.service;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;
import org.renuka.sms.account.entity.Account;
import org.renuka.sms.account.repository.AccountRepository;
import org.renuka.sms.common.exception.SmsResourceNotFoundException;

import java.util.Date;
import java.util.Optional;

public class AccountServiceTest {
    @Before
    public void setup() {

    }

    @Test
    public void getAccountByIdTest() {
        //// Mock account object
        Account account = new Account();
        account.setId(12L);
        account.setAccountNo("11560K");
        account.setAccountTypeId(5L);
        account.setBalance(8875.45);
        account.setBranchId(865L);
        account.setCreatedDate(new Date());
        account.setOwnerId(885L);
        Optional<Account> optionalAccount = Optional.of(account);

        // Happy Path
        //// Mock account repository
        AccountRepository accountRepository = Mockito.mock(AccountRepository.class);
        Mockito.when(accountRepository.findById(12L)).thenReturn(optionalAccount);
        AccountService accountService = new AccountService(accountRepository);
        try {
            Account accountById = accountService.getAccountById(12L);
            Assert.assertEquals(account, accountById);
        } catch (SmsResourceNotFoundException e) {
            Assert.fail();
        }


    }

    @Test(expected = SmsResourceNotFoundException.class)
    public void getAccountByIdErrorPathTest() throws SmsResourceNotFoundException {
        // Error Path
        Optional<Account> optionalAccount = Optional.empty();
        //// Mock account repository
        AccountRepository accountRepository = Mockito.mock(AccountRepository.class);
        Mockito.when(accountRepository.findById(12L)).thenReturn(optionalAccount);

        AccountService accountService = new AccountService(accountRepository);
        accountService.getAccountById(12L);
    }
}
