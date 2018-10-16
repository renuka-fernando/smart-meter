package org.renuka.sms.common.dto;

import java.util.Map;

public class ErrorDTO {
    private Long code;
    private String message;
    private Map<String, String> params;

    public Long getCode() {
        return code;
    }

    public void setCode(Long code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Map<String, String> getParams() {
        return params;
    }

    public void setParams(Map<String, String> params) {
        this.params = params;
    }

    @Override
    public String toString() {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("ERROR:\n");
        stringBuilder.append("\tcode: ").append(code).append("\n");
        stringBuilder.append("\tmessage: ").append(message).append("\n");
        stringBuilder.append("\tmore: ").append(params).append("\n");

        return stringBuilder.toString();
    }
}
