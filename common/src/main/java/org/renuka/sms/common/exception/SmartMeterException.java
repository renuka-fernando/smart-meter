package org.renuka.sms.common.exception;

public class SmartMeterException extends Exception {
    private ErrorHandler errorHandler;

    public SmartMeterException(String message) {
        super(message);
        this.errorHandler = ExceptionCodes.INTERNAL_ERROR;
    }

    public SmartMeterException(String message, Throwable cause) {
        super(message, cause);
        this.errorHandler = ExceptionCodes.INTERNAL_ERROR;
    }

    public SmartMeterException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

    public SmartMeterException(String message, ErrorHandler errorHandler) {
        super(message);
        this.errorHandler = errorHandler;
    }

    public SmartMeterException(String message, Throwable cause, ErrorHandler errorHandler) {
        super(message, cause);
        this.errorHandler = errorHandler;
    }

    public ErrorHandler getErrorHandler() {
        return errorHandler;
    }
}
