package org.renuka.sms.reading.dto;

import org.renuka.sms.common.exception.ExceptionCodes;
import org.renuka.sms.common.exception.SmartMeterException;

public class MonthlyReadingDTO implements ReadingListItemDTO{
    private Integer month;
    private Double value;

    public MonthlyReadingDTO(Integer month, Double min, Double max) {
        this.month = month;
        this.value = max - min;
    }

    public Integer getMonth() {
        return month;
    }

    public void setMonth(Integer month) {
        this.month = month;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public static MonthlyReadingDTO parse(Object[] fields) throws SmartMeterException {
        try {
            return new MonthlyReadingDTO((Integer) fields[0], (Double) fields[1], (Double) fields[2]);
        } catch (ClassCastException e) {
            throw new SmartMeterException("Error while parsing MonthlyReadingDTO",
                    e, ExceptionCodes.ENTITY_TO_DTO_PARSE_ERROR);
        }
    }
}
