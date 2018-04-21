package org.renuka.sms.common.exception;

public class ReadinValueEncryptionException extends SmartMeterException {
    public ReadinValueEncryptionException(String message) {
        super(message);
    }

    public ReadinValueEncryptionException(String message, Throwable cause) {
        super(message, cause);
    }

    public ReadinValueEncryptionException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

    public ReadinValueEncryptionException(String message, ErrorHandler errorHandler) {
        super(message, errorHandler);
    }

    public ReadinValueEncryptionException(String message, Throwable cause, ErrorHandler errorHandler) {
        super(message, cause, errorHandler);
    }
}
