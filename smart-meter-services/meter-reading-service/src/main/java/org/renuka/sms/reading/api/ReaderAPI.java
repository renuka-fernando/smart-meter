package org.renuka.sms.reading.api;

import org.renuka.sms.common.dto.ErrorDTO;
import org.renuka.sms.common.exception.SmartMeterException;
import org.renuka.sms.common.util.RestApiUtil;
import org.renuka.sms.reading.dto.AccountReadingListDTO;
import org.renuka.sms.reading.dto.MonthlyReadingDTO;
import org.renuka.sms.reading.entity.Reading;
import org.renuka.sms.reading.service.ReadingService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/reads")
public class ReaderAPI {
    private ReadingService readingService;
    private static final Logger logger = LoggerFactory.getLogger(ReaderAPI.class);

    @Autowired
    public ReaderAPI(ReadingService readingService) {
        this.readingService = readingService;
    }

    /***
     * Get Meter Readings of given accountId list with a specified time duration
     * @param accountIdList List of account ids
     * @param timestampFrom From timestamp in nano seconds
     * @param timestampTo To timestamp in nano seconds
     * @return List of readings
     */
    @GetMapping
    public ResponseEntity<Iterable<Reading>> getReads(
            @RequestParam("accountIdList") List<Long> accountIdList,
            @RequestParam(value = "timestampFrom", required = false) Long timestampFrom,
            @RequestParam(value = "timestampTo", required = false) Long timestampTo) {
        return ResponseEntity.ok(readingService.getReadings(accountIdList, timestampFrom, timestampTo));
    }

    @GetMapping("/monthly")
    public ResponseEntity getMonthlyReadings(
            @RequestParam("accountIdList") List<Long> accountIdList) {
        Iterable<AccountReadingListDTO<MonthlyReadingDTO>> monthlyReadings;
        try {
            monthlyReadings = readingService.getMonthlyReadings(accountIdList);
        } catch (SmartMeterException e) {
            ErrorDTO errorDTO = RestApiUtil.getErrorDTO(e.getErrorHandler(), null);
            logger.error(e.getMessage(), e);
            return new ResponseEntity<>(errorDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return ResponseEntity.ok(monthlyReadings);
    }
}
