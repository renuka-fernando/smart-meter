package org.renuka.sms.common.exception;

public class ReadingValueEncryptionException extends SmartMeterException {
    public ReadingValueEncryptionException(String message) {
        super(message);
    }

    public ReadingValueEncryptionException(String message, Throwable cause) {
        super(message, cause);
    }

    public ReadingValueEncryptionException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

    public ReadingValueEncryptionException(String message, ErrorHandler errorHandler) {
        super(message, errorHandler);
    }

    public ReadingValueEncryptionException(String message, Throwable cause, ErrorHandler errorHandler) {
        super(message, cause, errorHandler);
    }
}
