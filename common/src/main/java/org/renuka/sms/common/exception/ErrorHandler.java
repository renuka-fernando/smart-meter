package org.renuka.sms.common.exception;

public interface ErrorHandler {
    long getErrorCode();

    String getErrorMessage();

    default int getHttpStatusCode() {
        return 500;
    }
}
