package org.renuka.sms.createreading.service;

import org.renuka.sms.createreading.constants.ReadingConstants;
import org.renuka.sms.createreading.entity.Reading;
import org.renuka.sms.createreading.repository.ReadingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.LinkedList;
import java.util.Random;

@Service
public class ReadingService {
    private ReadingRepository readingRepository;

    @Autowired
    public ReadingService(ReadingRepository readingRepository) {
        this.readingRepository = readingRepository;
    }

    public Iterable<Reading> createReadingsForLastDay(Long accountId, Integer noOfDays) {
        LinkedList<Reading> readings = new LinkedList<>();
        Date currentTime = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(currentTime);
        Random random = new Random(currentTime.getTime());

        Reading lastReading = readingRepository.findLastReadingByAccount_id(accountId);
        double lastReadingValue = (lastReading == null) ? 0 : lastReading.getReading();
        Date lastReadingDate = (lastReading == null) ? new Date(0) : lastReading.getTimestamp();

        if (noOfDays == null) noOfDays = 1;
        calendar.add(Calendar.MINUTE, -(60 * noOfDays * 24 + 15)); // number of days and 15 minutes
        Date timeFrom = calendar.getTime().after(lastReadingDate) ? calendar.getTime() : lastReadingDate;
        calendar.setTime(timeFrom);
        calendar.add(Calendar.MINUTE, 15);

        while (calendar.getTime().before(currentTime)) {
            // Set timestamp
            int varient = (int) ((random.nextDouble() - 0.5D) * 120000);
            Reading reading = new Reading();
            reading.setTimestamp(calendar.getTime());
            calendar.add(Calendar.MILLISECOND, ReadingConstants.MINUTES_15 + varient);

            // Set value of reading
            lastReadingValue += random.nextDouble() * 0.06D;
            reading.setReading(lastReadingValue);

            reading.setAccount_id(accountId);
            readings.add(reading);
        }

        return readingRepository.saveAll(readings);
    }
}
