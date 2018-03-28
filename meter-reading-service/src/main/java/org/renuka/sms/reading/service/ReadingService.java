package org.renuka.sms.reading.service;

import org.renuka.sms.reading.constants.ReadingConstants;
import org.renuka.sms.reading.entity.Reading;
import org.renuka.sms.reading.repository.ReadingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Objects;

@Service
public class ReadingService {
    private ReadingRepository readingRepository;

    @Autowired
    public ReadingService(ReadingRepository readingRepository) {
        this.readingRepository = readingRepository;
    }

    public Reading addReading(Long accountId, Reading reading) {
        if (Objects.equals(accountId, reading.getAccount_id())) { // TODO: validate encryption
            reading.setTimestamp(new Date().getTime());
            return readingRepository.save(reading);
        } else
            return null;
    }

    public Iterable<Reading> getAccountReadings(Long accountId, Long timestampFrom, Long timestampTo) {
        if (timestampFrom == null) timestampFrom = getDefaultTimestampFrom();
        if (timestampTo == null) timestampTo = getDefaultTimestampTo();
        return readingRepository.findByAccount(accountId, timestampFrom, timestampTo);
    }

    public Iterable<Reading> getReadings(List<Long> accountIdList, Long timestampFrom, Long timestampTo) {
        if (timestampFrom == null) timestampFrom = getDefaultTimestampFrom();
        if (timestampTo == null) timestampTo = getDefaultTimestampTo();
        return readingRepository.findByListOfAccounts(accountIdList, timestampFrom, timestampTo);
    }

    private Long getDefaultTimestampFrom() {
        return new Date().getTime() - ReadingConstants.ONE_DAY_MI_SECONDS;
    }

    private Long getDefaultTimestampTo() {
        return new Date().getTime();
    }


}
