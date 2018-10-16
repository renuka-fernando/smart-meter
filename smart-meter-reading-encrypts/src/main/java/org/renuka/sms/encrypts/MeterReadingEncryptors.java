package org.renuka.sms.encrypts;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.renuka.sms.common.constants.CommonConstants;
import org.renuka.sms.common.dto.ReadingDTO;
import org.renuka.sms.common.util.SecurityUtils;

import java.util.Scanner;

public class MeterReadingEncryptors {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        ObjectMapper mapper = new ObjectMapper();


        System.out.print("Account ID: ");
        long accountId = scanner.nextLong();

        System.out.print("Meter Reading Value: ");
        double readingValue = scanner.nextDouble();

        ReadingDTO readingDTO = new ReadingDTO();
        readingDTO.setAccount_id(accountId);
        readingDTO.setReading(readingValue);

        try {
            String jsonValue = mapper.writeValueAsString(readingDTO);
            String encryptedMeterReadingValue = SecurityUtils.encrypt(CommonConstants.ENCRYPTION_DECRYPTION_KEY,
                    CommonConstants.ENCRYPTION_DECRYPTION_IV, jsonValue);
            System.out.println(String.format("Encrypted Value: %s", encryptedMeterReadingValue));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
