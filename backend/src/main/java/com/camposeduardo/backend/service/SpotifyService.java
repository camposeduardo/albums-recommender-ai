package com.camposeduardo.backend.service;

import com.camposeduardo.backend.dto.SpotifyAlbumInformationDTO;
import com.camposeduardo.backend.dto.SpotifySearchResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class SpotifyService {

    @Autowired
    private RestTemplate restTemplate;

    public List<SpotifyAlbumInformationDTO> search(String album, String token) {

        String url = "https://api.spotify.com/v1/search?q=%s&type=album&limit=%d";

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        String fullUrl = String.format(url, album, 5);

        ResponseEntity<SpotifySearchResponseDTO> response = restTemplate.exchange(fullUrl, HttpMethod.GET, entity,
                SpotifySearchResponseDTO.class);
        System.out.println(response);

        SpotifySearchResponseDTO searchResponse = response.getBody();

        if (response.getBody() == null || searchResponse.albumsWrapper().albums() == null) {
            throw new RuntimeException();
        }
        
        return searchResponse.albumsWrapper().albums();
    }
}
