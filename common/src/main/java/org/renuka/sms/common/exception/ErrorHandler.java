package org.renuka.sms.common.exception;

import java.io.Serializable;

public interface ErrorHandler extends Serializable {
    long getErrorCode();

    String getErrorMessage();

    default int getHttpStatusCode() {
        return 500;
    }
}
