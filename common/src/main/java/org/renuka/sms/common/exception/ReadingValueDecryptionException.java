package org.renuka.sms.common.exception;

public class ReadingValueDecryptionException extends SmartMeterException {
    public ReadingValueDecryptionException(String message) {
        super(message);
    }

    public ReadingValueDecryptionException(String message, Throwable cause) {
        super(message, cause);
    }

    public ReadingValueDecryptionException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

    public ReadingValueDecryptionException(String message, ErrorHandler errorHandler) {
        super(message, errorHandler);
    }

    public ReadingValueDecryptionException(String message, Throwable cause, ErrorHandler errorHandler) {
        super(message, cause, errorHandler);
    }
}
