package org.renuka.sms.reading.api;

import org.renuka.sms.common.dto.ErrorDTO;
import org.renuka.sms.common.exception.ReadingValueDecryptionException;
import org.renuka.sms.common.exception.SmsResourceNotFoundException;
import org.renuka.sms.common.util.RestApiUtil;
import org.renuka.sms.reading.constants.ReadingConstants;
import org.renuka.sms.reading.entity.Reading;
import org.renuka.sms.reading.service.ReadingService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Date;
import java.util.HashMap;

@RestController
@RequestMapping("/accounts/{accountId}/reads")
public class AccountReaderAPI {

    private static final Logger logger = LoggerFactory.getLogger(AccountReaderAPI.class);
    private ReadingService readingService;

    @Autowired
    public AccountReaderAPI(ReadingService readingService) {
        this.readingService = readingService;
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity addReading(@PathVariable("accountId") Long accountId, @RequestBody String reading) {
        Reading result = null;
        try {
            result = readingService.addReading(accountId, reading);
        } catch (ReadingValueDecryptionException e) {
            HashMap<String, String> params = new HashMap<>();
            params.put(ReadingConstants.ExceptionsConstants.ENCRYPED_METER_REAING, reading);
            ErrorDTO errorDTO = RestApiUtil.getErrorDTO(e.getErrorHandler(), params);
            logger.error(e.getMessage(), e);

            return new ResponseEntity<>(errorDTO, HttpStatus.FORBIDDEN);
        }

        if (result != null) {
            URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                    .buildAndExpand(result.getId()).toUri();
            return ResponseEntity.created(location).body(result);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping
    public ResponseEntity<Iterable<Reading>> getAccountReadings(
            @PathVariable("accountId") Long accountId,
            @RequestParam(value = "timestampFrom", required = false) Long timestampFrom,
            @RequestParam(value = "timestampTo", required = false) Long timestampTo) {
        return ResponseEntity.ok(readingService.getAccountReadings(accountId, timestampFrom, timestampTo));
    }

    @GetMapping("/{readId}")
    public ResponseEntity getAccountReadingById(@PathVariable("accountId") Long accountId,
                                                   @PathVariable("readId") Long readId) {
        try {
            return ResponseEntity.ok(readingService.getAccountReadingById(accountId, readId));
        } catch (SmsResourceNotFoundException e) {
            HashMap<String, String> params = new HashMap<>();
            params.put(ReadingConstants.ExceptionsConstants.READING_ID, readId.toString());
            ErrorDTO errorDTO = RestApiUtil.getErrorDTO(e.getErrorHandler(), params);
            logger.error(e.getMessage(), e);

            return new ResponseEntity<>(errorDTO, HttpStatus.NOT_FOUND);
        }
    }
}
