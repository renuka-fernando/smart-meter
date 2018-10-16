package org.renuka.sms.common.exception;

public class SmsResourceNotFoundException extends SmartMeterException {
    public SmsResourceNotFoundException(String message) {
        super(message);
    }

    public SmsResourceNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public SmsResourceNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

    public SmsResourceNotFoundException(String message, ErrorHandler errorHandler) {
        super(message, errorHandler);
    }

    public SmsResourceNotFoundException(String message, Throwable cause, ErrorHandler errorHandler) {
        super(message, cause, errorHandler);
    }
}
