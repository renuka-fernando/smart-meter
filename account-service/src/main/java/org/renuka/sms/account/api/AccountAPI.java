package org.renuka.sms.account.api;

import org.renuka.sms.account.service.AccountService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/accounts")
public class AccountAPI {
    private static final Logger logger = LoggerFactory.getLogger(AccountAPI.class);
    private AccountService accountService;

    @Autowired
    public AccountAPI(AccountService accountService) {
        this.accountService = accountService;
    }


}
