package org.renuka.sms.reading.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.renuka.sms.common.constants.CommonConstants;
import org.renuka.sms.common.exception.ExceptionCodes;
import org.renuka.sms.common.exception.ReadingValueDecryptionException;
import org.renuka.sms.common.exception.SmartMeterException;
import org.renuka.sms.common.exception.SmsResourceNotFoundException;
import org.renuka.sms.common.util.SecurityUtils;
import org.renuka.sms.reading.dto.AccountReadingListDTO;
import org.renuka.sms.reading.dto.MonthlyReadingDTO;
import org.renuka.sms.reading.entity.Reading;
import org.renuka.sms.reading.repository.ReadingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PreDestroy;
import javax.jms.*;
import javax.jms.Queue;
import java.io.IOException;
import java.util.*;

@Service
public class ReadingService {
    private ReadingRepository readingRepository;
    private ConnectionFactory jsmConnectionFactory;
    private Session session;
    private Connection connection;
    private Logger logger = LoggerFactory.getLogger(ReadingService.class);

    @Autowired
    public ReadingService(ReadingRepository readingRepository, ConnectionFactory jsmConnectionFactory) throws JMSException {
        this.readingRepository = readingRepository;
        this.jsmConnectionFactory = jsmConnectionFactory;

        this.connection = jsmConnectionFactory.createConnection();
        connection.start();
        this.session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
    }

    @PreDestroy
    public void destroy() throws JMSException {
        this.session.close();
        this.connection.close();
    }

    public Reading addReading(Long accountId, String reading) throws ReadingValueDecryptionException {
        Reading decryptedReading = decryptReading(reading);

        if (decryptedReading.getAccount_id().equals(accountId)) {
            decryptedReading.setTimestamp(new Date());
            analyse(decryptedReading);
            return readingRepository.save(decryptedReading);
        } else {
            throw new ReadingValueDecryptionException("Invalid Account ID", ExceptionCodes.INVALID_ACCOUNT_ID);
        }
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

    public Reading getAccountReadingById(Long accountId, Long readId) throws SmsResourceNotFoundException {
        Optional<Reading> result = readingRepository.findById(readId);
        if (result.isPresent() && result.get().getAccount_id().equals(accountId)) {
            return result.get();
        } else {
            throw new SmsResourceNotFoundException("Reading not found : " + readId,
                    ExceptionCodes.METER_READING_NOT_FOUND);
        }
    }

    public Iterable<AccountReadingListDTO<MonthlyReadingDTO>> getMonthlyReadings(List<Long> accountIdList) throws SmartMeterException {
        Date from = getDefaultYearTimestampFrom();
        Date to = getDefaultTimestampTo();
        LinkedList<AccountReadingListDTO<MonthlyReadingDTO>> monthlyConsumption = new LinkedList<>();

        for (Long accountId : accountIdList) {
            AccountReadingListDTO<MonthlyReadingDTO> accountReadingListDTO = new AccountReadingListDTO<>();
            accountReadingListDTO.setAccountId(accountId);

            LinkedList<MonthlyReadingDTO> readingDTOS = new LinkedList<>();
            for (Object[] monthRead : readingRepository.findMonthlySummeryByAccount_id(accountId, from, to)) {
                readingDTOS.add(MonthlyReadingDTO.parse(monthRead));
            }
            accountReadingListDTO.setReadings(readingDTOS);
            monthlyConsumption.add(accountReadingListDTO);
        }

        return monthlyConsumption;
    }

    private Date getDefaultTimestampFrom() {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DATE, -1);
        return calendar.getTime();
    }

    private Date getDefaultYearTimestampFrom() {
        Calendar calendar = Calendar.getInstance();
        int year = calendar.get(Calendar.YEAR);
        int month = calendar.get(Calendar.MONTH);
        calendar.set(year - 1, month + 1, 1);
        return calendar.getTime();
    }

    private Date getDefaultTimestampTo() {
        return new Date();
    }

    private Reading decryptReading(String reading) throws ReadingValueDecryptionException {
        ObjectMapper mapper = new ObjectMapper();
        String decryptedReading = SecurityUtils.decrypt(CommonConstants.ENCRYPTION_DECRYPTION_KEY,
                CommonConstants.ENCRYPTION_DECRYPTION_IV, reading);
        try {
            return mapper.readValue(decryptedReading, Reading.class);
        } catch (IOException e) {
            throw new ReadingValueDecryptionException("Failed to parse Reading to JSON",
                    ExceptionCodes.JSON_PRCESSING_ERROR);
        }
    }

    private void analyse(Reading decryptedReading) {
        double value = decryptedReading.getReading();
        // TODO: this check is done to get the average and hard coded for prototype
        if (value >= 0.4) {
            // TODO: try catch for demo purpose should handle this error
            Date now = new Date();

            try {
                Queue notifications = this.session.createQueue("notifications");
                MessageProducer producer = session.createProducer(notifications);
                Message message = session.createTextMessage("High usage of electricity at " + now.toString());
                producer.send(message);
            } catch (JMSException e) {
                logger.error("Error while creating JSM queue", e);
            }
        }
    }
}
