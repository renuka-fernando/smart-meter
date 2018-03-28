package org.renuka.sms.reading.api;

import org.renuka.sms.reading.entity.Reading;
import org.renuka.sms.reading.service.ReadingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/reads")
public class ReaderAPI {
    private ReadingService readingService;

    @Autowired
    public ReaderAPI(ReadingService readingService) {
        this.readingService = readingService;
    }

    @GetMapping
    public ResponseEntity<Iterable<Reading>> getReads(
            @RequestParam("accountIdList") List<Long> accountIdList,
            @RequestParam(value = "timestampFrom", required = false) Long timestampFrom,
            @RequestParam(value = "timestampTo", required = false) Long timestampTo) {
        return ResponseEntity.ok(readingService.getReadings(accountIdList, timestampFrom, timestampTo));
    }
}
