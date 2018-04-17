package org.renuka.sms.reading.service;

import org.renuka.sms.common.exception.ExceptionCodes;
import org.renuka.sms.common.exception.SmsResourceNotFoundException;
import org.renuka.sms.reading.constants.ReadingConstants;
import org.renuka.sms.reading.dto.MonthlyReading;
import org.renuka.sms.reading.entity.Reading;
import org.renuka.sms.reading.repository.ReadingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ReadingService {
    private ReadingRepository readingRepository;

    @Autowired
    public ReadingService(ReadingRepository readingRepository) {
        this.readingRepository = readingRepository;
    }

    public Reading addReading(Long accountId, Reading reading) {
        if (Objects.equals(accountId, reading.getAccount_id())) { // TODO: validate encryption
            reading.setTimestamp(new Date());
            return readingRepository.save(reading);
        } else
            return null;
    }

    public Iterable<Reading> getAccountReadings(Long accountId, Long timestampFrom, Long timestampTo) {
        Date from = (timestampFrom == null) ? getDefaultTimestampFrom() : new Date(timestampFrom);
        Date to = (timestampTo == null) ? getDefaultTimestampTo() : new Date(timestampTo);
        return readingRepository.findByAccount(accountId, from, to);
    }

    public Iterable<Reading> getReadings(List<Long> accountIdList, Long timestampFrom, Long timestampTo) {
        Date from = (timestampFrom == null) ? getDefaultTimestampFrom() : new Date(timestampFrom);
        Date to = (timestampTo == null) ? getDefaultTimestampTo() : new Date(timestampTo);
        return readingRepository.findByListOfAccounts(accountIdList, from, to);
    }

    private Date getDefaultTimestampFrom() {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DATE, -1);
        return calendar.getTime();
    }

    private Date getDefaultTimestampTo() {
        return new Date();
    }


    public Reading getAccountReadingById(Long accountId, Long readId) throws SmsResourceNotFoundException {
        Optional<Reading> result = readingRepository.findById(readId);
        if (result.isPresent() && result.get().getAccount_id().equals(accountId)) {
            return result.get();
        } else {
            throw new SmsResourceNotFoundException("Reading not found : " + readId,
                    ExceptionCodes.METER_READING_NOT_FOUND);
        }
    }

    public Iterable<MonthlyReading> getMonthlyReadings(List<Long> accountIdList, Long timestampFrom, Long timestampTo) {
        return null;
    }
}
