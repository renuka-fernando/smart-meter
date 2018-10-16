package org.renuka.sms.common.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.renuka.sms.common.constants.CommonConstants;
import org.renuka.sms.common.dto.ReadingDTO;
import org.renuka.sms.common.exception.ReadingValueDecryptionException;
import org.renuka.sms.common.exception.ReadingValueEncryptionException;

public class SecurityUtilsTest {
    private ReadingDTO readingDTO;
    private static final String expectedEncryptedReading
            = "pZaRQx9gXTe0rsJ3pK4znnzGpnSvZ4l/PzwJQIwkjEngqRIYqE1nvnfgMfTKUSJv";

    @Before
    public void setup() {
        readingDTO = new ReadingDTO();
        readingDTO.setAccount_id(5542L);
        readingDTO.setReading(88665.12);
    }

    @Test
    public void encryptTest() throws JsonProcessingException, ReadingValueEncryptionException {
        // Happy Path
        ObjectMapper mapper = new ObjectMapper();
        String jsonValue = mapper.writeValueAsString(readingDTO);

        String encryptedReading = SecurityUtils.encrypt(CommonConstants.ENCRYPTION_DECRYPTION_KEY,
                CommonConstants.ENCRYPTION_DECRYPTION_IV, jsonValue);
        Assert.assertEquals(expectedEncryptedReading, encryptedReading);
    }

    @Test
    public void decryptTest() throws ReadingValueDecryptionException, JsonProcessingException {
        // Happy Path
        ObjectMapper mapper = new ObjectMapper();
        String jsonValue = mapper.writeValueAsString(readingDTO);

        String decryptedReading = SecurityUtils.decrypt(CommonConstants.ENCRYPTION_DECRYPTION_KEY,
                CommonConstants.ENCRYPTION_DECRYPTION_IV, expectedEncryptedReading);

        Assert.assertEquals(jsonValue, decryptedReading);
    }
}
