package org.renuka.sms.reading.service;

import org.renuka.sms.reading.entity.Reading;
import org.renuka.sms.reading.repository.ReadingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReadingService {
    private ReadingRepository readingRepository;

    @Autowired
    public ReadingService(ReadingRepository readingRepository){
        this.readingRepository = readingRepository;
    }

    public void addReading(Reading reading) {
    }
}
