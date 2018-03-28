package org.renuka.sms.common.util;

import org.renuka.sms.common.dto.ErrorDTO;
import org.renuka.sms.common.exception.ErrorHandler;

import java.util.Map;

public class RestApiUtil {
    public static ErrorDTO getErrorDTO(ErrorHandler errorHandler, Map<String, String> params) {
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setCode(errorHandler.getErrorCode());
        errorDTO.setMessage(errorHandler.getErrorMessage());
        errorDTO.setParams(params);

        return errorDTO;
    }
}
