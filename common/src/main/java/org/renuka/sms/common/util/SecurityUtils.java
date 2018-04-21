package org.renuka.sms.common.util;

import org.apache.commons.codec.binary.Base64;
import org.renuka.sms.common.exception.ExceptionCodes;
import org.renuka.sms.common.exception.ReadinValueEncryptionException;
import org.renuka.sms.common.exception.ReadingValueDecryptionException;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

public class SecurityUtils {
    public static String encrypt(String key, String initVector, String value) throws ReadinValueEncryptionException {
        byte[] encrypted;

        try {
            IvParameterSpec iv = new IvParameterSpec(initVector.getBytes("UTF-8"));
            SecretKeySpec skeySpec = new SecretKeySpec(key.getBytes("UTF-8"), "AES");

            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
            cipher.init(Cipher.ENCRYPT_MODE, skeySpec, iv);
            encrypted = cipher.doFinal(value.getBytes());
        } catch (Exception e) {
            throw new ReadinValueEncryptionException("Error while encrypting the meter reading value",
                    ExceptionCodes.ENCRYPTION_ERROR);
        }
        return Base64.encodeBase64String(encrypted);
    }

    public static String decrypt(String key, String initVector, String encrypted) throws ReadingValueDecryptionException {
        byte[] decrypted;
        try {
            IvParameterSpec iv = new IvParameterSpec(initVector.getBytes("UTF-8"));
            SecretKeySpec skeySpec = new SecretKeySpec(key.getBytes("UTF-8"), "AES");

            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
            cipher.init(Cipher.DECRYPT_MODE, skeySpec, iv);

            decrypted = cipher.doFinal(Base64.decodeBase64(encrypted));
        } catch (Exception e) {
            throw new ReadingValueDecryptionException("Error while decrypting the meter reading value",
                    ExceptionCodes.DECRYPTION_ERROR);
        }

        return new String(decrypted);
    }
}