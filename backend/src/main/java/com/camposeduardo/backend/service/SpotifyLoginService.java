package com.camposeduardo.backend.service;

import com.camposeduardo.backend.dto.AccessTokenDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Map;

@Service
public class SpotifyLoginService {
    @Autowired
    private AuthService authService;

    @Autowired
    private RestTemplate restTemplate;

    String clientId = System.getenv("CLIENT_ID");

    public Map<String, String> createUserAuthURL() {
        String codeVerifier = authService.generateCodeVerifier(64);
        String codeChallenge = authService.generateCodeChallenge(codeVerifier);

        String spotifyUrl = String.format(
                "https://accounts.spotify.com/authorize?" +
                        "client_id=%s&response_type=code&redirect_uri=%s" +
                        "&scope=%s&code_challenge_method=S256&code_challenge=%s",
                clientId,
                "http://localhost:4200/album-recommender",
                "user-read-private user-read-email user-library-modify",
                codeChallenge
        );

        return Map.of("url", spotifyUrl, "verifier", codeVerifier);
    }

    public AccessTokenDTO requestAccessToken(String code, String verifier) {

        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.CONTENT_TYPE, "application/x-www-form-urlencoded");
        HttpEntity<String> entity = new HttpEntity<>(headers);

        String URI = UriComponentsBuilder.fromHttpUrl("https://accounts.spotify.com/api/token")
                .queryParam("client_id", clientId)
                .queryParam("grant_type", "authorization_code")
                .queryParam("code", code)
                .queryParam("redirect_uri", "http://localhost:4200/album-recommender")
                .queryParam("code_verifier", verifier)
                .toUriString();

        ResponseEntity<AccessTokenDTO> token = restTemplate.exchange(
                URI, HttpMethod.POST, entity,
                AccessTokenDTO.class);

        return token.getBody();
    }
}
