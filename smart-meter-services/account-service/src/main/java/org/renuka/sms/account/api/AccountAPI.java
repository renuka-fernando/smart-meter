package org.renuka.sms.account.api;

import org.renuka.sms.account.constants.AccountConstants;
import org.renuka.sms.account.entity.Account;
import org.renuka.sms.account.service.AccountService;
import org.renuka.sms.common.dto.ErrorDTO;
import org.renuka.sms.common.exception.SmsResourceNotFoundException;
import org.renuka.sms.common.util.RestApiUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/accounts")
public class AccountAPI {
    private static final Logger logger = LoggerFactory.getLogger(AccountAPI.class);
    private AccountService accountService;

    @Autowired
    public AccountAPI(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping
    public ResponseEntity<Page<Account>> getAccounts(
            @RequestParam(value = "page", required = false, defaultValue = "0") Integer page,
            @RequestParam(value = "size", required = false, defaultValue = "20") Integer size) {
        return ResponseEntity.ok(accountService.getAccounts(page, size));
    }

    @GetMapping("/{accountId}")
    public ResponseEntity getAccountById(@PathVariable Long accountId) {
        try {
            return ResponseEntity.ok(accountService.getAccountById(accountId));
        } catch (SmsResourceNotFoundException e) {
            HashMap<String, String> params = new HashMap<>();
            params.put(AccountConstants.ExceptionsConstants.ACCOUNT_ID, accountId.toString());
            ErrorDTO errorDTO = RestApiUtil.getErrorDTO(e.getErrorHandler(), params);
            logger.error(e.getMessage(), e);

            return new ResponseEntity<>(errorDTO, HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity addAccount(@RequestBody Account account) {
        try {
            return ResponseEntity.ok(accountService.addAccount(account));
        } catch (SmsResourceNotFoundException e) {
            ErrorDTO errorDTO = RestApiUtil.getErrorDTO(e.getErrorHandler(), null);
            logger.error(e.getMessage(), e);

            return new ResponseEntity<>(errorDTO, HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(method = RequestMethod.PUT, path = "/{accountId}")
    public ResponseEntity updateAccount(@PathVariable("accountId") Long accountId, @RequestBody Account account) {
        try {
            return ResponseEntity.ok(accountService.updateAccount(accountId, account));
        } catch (SmsResourceNotFoundException e) {
            HashMap<String, String> params = new HashMap<>();
            params.put(AccountConstants.ExceptionsConstants.ACCOUNT_ID, accountId.toString());
            ErrorDTO errorDTO = RestApiUtil.getErrorDTO(e.getErrorHandler(), params);
            logger.error(e.getMessage(), e);

            return new ResponseEntity<>(errorDTO, HttpStatus.NOT_FOUND);
        }
    }
}
