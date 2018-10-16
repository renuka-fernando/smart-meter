package org.renuka.sms.createreading.api;

import org.renuka.sms.createreading.service.ReadingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("{accountId}/create")
public class ReadingAPI {
    private ReadingService readingService;

    @Autowired
    public ReadingAPI(ReadingService readingService) {
        this.readingService = readingService;
    }

    @PostMapping("/")
    public ResponseEntity createReadingsForLastDay(
            @PathVariable Long accountId,
            @RequestParam(value = "timestampFrom", required = false) Integer noOfDays) {
        return ResponseEntity.ok(readingService.createReadingsForLastDay(accountId, noOfDays));
    }
}
