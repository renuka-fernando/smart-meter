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
    private AccountRepository accountRepositoryMock;

    @Before
    public void setup() {
        accountRepositoryMock = Mockito.mock(AccountRepository.class);
    }

    @Test
    public void getAccountByIdTest() {
        //// Mock account object
        Account account = getNewMockedAccount();
        Optional<Account> optionalAccount = Optional.of(account);

        // Happy Path
        //// Mock account repository
        Mockito.when(accountRepositoryMock.findById(12L)).thenReturn(optionalAccount);
        AccountService accountService = new AccountService(accountRepositoryMock);
        try {
            Account accountById = accountService.getAccountById(12L);
            Assert.assertEquals(account.getAccountNo(), accountById.getAccountNo());
            Assert.assertEquals(account.getAccountTypeId(), accountById.getAccountTypeId());
            Assert.assertEquals(account.getBalance(), accountById.getBalance());
            Assert.assertEquals(account.getBranchId(), accountById.getBranchId());
            Assert.assertEquals(account.getCreatedDate(), accountById.getCreatedDate());
            Assert.assertEquals(account.getOwnerId(), accountById.getOwnerId());
            Assert.assertEquals(account.getId(), accountById.getId());
        } catch (SmsResourceNotFoundException e) {
            Assert.fail();
        }
    }

    @Test(expected = SmsResourceNotFoundException.class)
    public void getAccountByIdErrorPathTest() throws SmsResourceNotFoundException {
        // Error Path
        Optional<Account> optionalAccount = Optional.empty();
        //// Mock account repository
        Mockito.when(accountRepositoryMock.findById(12L)).thenReturn(optionalAccount);

        AccountService accountService = new AccountService(accountRepositoryMock);
        accountService.getAccountById(12L);
    }

    @Test
    public void updateAccountTest() {
        //// Mock account object
        Account account = getNewMockedAccount();
        account.setBalance(9123.21D);
        Optional<Account> optionalAccount = Optional.of(account);

        // Happy Path
        //// Mock account repository
        Mockito.when(accountRepositoryMock.findById(12L)).thenReturn(optionalAccount);
        Account updatedAccount = getNewMockedAccount();
        updatedAccount.setBalance(9123.21D);
        Mockito.when(accountRepositoryMock.save(account)).thenReturn(updatedAccount);
        AccountService accountService = new AccountService(accountRepositoryMock);
        try {
            Account updateAccount = accountService.updateAccount(12L, account);
            Assert.assertEquals(account.getAccountNo(), updateAccount.getAccountNo());
            Assert.assertEquals(account.getAccountTypeId(), updateAccount.getAccountTypeId());
            Assert.assertEquals(account.getBalance(), updateAccount.getBalance());
            Assert.assertEquals(account.getBranchId(), updateAccount.getBranchId());
            Assert.assertEquals(account.getCreatedDate(), updateAccount.getCreatedDate());
            Assert.assertEquals(account.getOwnerId(), updateAccount.getOwnerId());
            Assert.assertEquals(account.getId(), updateAccount.getId());
        } catch (SmsResourceNotFoundException e) {
            Assert.fail();
        }
    }

    @Test(expected = SmsResourceNotFoundException.class)
    public void updateAccountErrorPathTest() throws SmsResourceNotFoundException {
        //// Mock account object
        Account account = getNewMockedAccount();
        account.setBalance(9123.21D);

        // Error Path
        //// Mock account repository
        Optional<Account> optionalEmptyAccount = Optional.empty();
        Mockito.when(accountRepositoryMock.findById(12L)).thenReturn(optionalEmptyAccount);
        Account updatedAccount = getNewMockedAccount();
        updatedAccount.setBalance(9123.21D);
        Mockito.when(accountRepositoryMock.save(account)).thenReturn(updatedAccount);

        AccountService accountService = new AccountService(accountRepositoryMock);
        accountService.updateAccount(12L, account);
    }

    private Account getNewMockedAccount() {
        Account account = new Account();
        account.setId(12L);
        account.setAccountNo("11560K");
        account.setAccountTypeId(5L);
        account.setBalance(8875.45);
        account.setBranchId(865L);
        account.setCreatedDate(new Date());
        account.setOwnerId(885L);

        return account;
    }
}
