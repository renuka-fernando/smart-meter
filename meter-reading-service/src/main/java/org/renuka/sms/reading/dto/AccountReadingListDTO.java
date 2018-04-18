package org.renuka.sms.reading.dto;

public class AccountReadingListDTO<T extends ReadingListItemDTO> {
    Long accountId;
    Iterable<T> readings;

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    public Iterable<T> getReadings() {
        return readings;
    }

    public void setReadings(Iterable<T> readings) {
        this.readings = readings;
    }
}
