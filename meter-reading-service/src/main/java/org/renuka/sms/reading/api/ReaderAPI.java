package org.renuka.sms.reading.api;

import org.renuka.sms.reading.entity.Reading;
import org.renuka.sms.reading.service.ReadingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/reads")
public class ReaderAPI {
    private ReadingService readingService;

    @Autowired
    public ReaderAPI(ReadingService readingService) {
        this.readingService = readingService;
    }

    @RequestMapping(method = RequestMethod.POST)
    public void addReading(@RequestBody Reading reading) {
        readingService.addReading(reading);
    }
}
