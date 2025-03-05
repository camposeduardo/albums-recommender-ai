package com.camposeduardo.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;

import static java.security.MessageDigest.getInstance;

@Service
public class AuthService {

    @Autowired
    private static final SecureRandom RANDOM = new SecureRandom();

    public String generateCodeVerifier(int length) {
        StringBuilder result = new StringBuilder(length);
        String possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (int i = 0; i < 128; i++) {
            int index = RANDOM.nextInt(possible.length());
            result.append(possible.charAt(index));
        }
        return result.toString();
    }

    public String generateCodeChallenge(String codeVerifier) {
        byte[] encoder = codeVerifier.getBytes();
        try {
            MessageDigest md = getInstance("SHA-256");
            byte[] sha256 = md.digest(encoder);
            return Base64.getUrlEncoder().withoutPadding().encodeToString(sha256);

        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

}
