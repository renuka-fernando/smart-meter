package org.renuka.sms.reading.api;

import org.renuka.sms.reading.entity.Reading;
import org.renuka.sms.reading.service.ReadingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/accounts/{accountId}/reads")
public class AccountReaderAPI {
    private ReadingService readingService;

    @Autowired
    public AccountReaderAPI(ReadingService readingService) {
        this.readingService = readingService;
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity addReading(@PathVariable("accountId") Long accountId, @RequestBody Reading reading) {
        Reading result = readingService.addReading(accountId, reading);
        if (result != null) {
            URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                    .buildAndExpand(result.getId()).toUri();
            return ResponseEntity.created(location).build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping
    public ResponseEntity<Iterable<Reading>> getAccountReadings(
            @PathVariable("accountId") Long accountId,
            @RequestParam(value = "dateFrom", required = false) Long timestampFrom,
            @RequestParam(value = "dateTo", required = false) Long timestampTo) {
        return ResponseEntity.ok(readingService.getAccountReadings(accountId, timestampFrom, timestampTo));
    }
}
