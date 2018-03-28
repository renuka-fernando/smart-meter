package org.renuka.sms.common.exception;

public enum ExceptionCodes implements ErrorHandler {
    INTERNAL_ERROR(100000, "General Error", 500),

    METER_READING_NOT_FOUND(300000, "Meter Reading is not found", 404);


    private final long errorCode;
    private final String errorMessage;
    private final int httpStatusCode;

    ExceptionCodes(long errorCode, String errorMessage, int httpStatusCode) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
        this.httpStatusCode = httpStatusCode;
    }

    public long getErrorCode() {
        return errorCode;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public int getHttpStatusCode() {
        return httpStatusCode;
    }
}
