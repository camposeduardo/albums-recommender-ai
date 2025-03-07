package com.camposeduardo.backend.service;

import com.camposeduardo.backend.domain.Album;
import com.camposeduardo.backend.dto.SpotifyAlbumInformationDTO;
import com.camposeduardo.backend.dto.SpotifySearchResponseDTO;
import com.fasterxml.jackson.core.type.TypeReference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class SpotifyService {

    @Autowired
    private RestTemplate restTemplate;

    public List<SpotifyAlbumInformationDTO> search(String token,
                                                   List<Album> recommendedAlbums) {
        return fetchAlbumsFromSpotify(recommendedAlbums, token);
    }

    public List<SpotifyAlbumInformationDTO> search(String token, String album) {
        return fetchAlbumsFromSpotify(album, token);
    }

    public List<SpotifyAlbumInformationDTO> fetchAlbumsFromSpotify(Object data, String token) {
        String url = "https://api.spotify.com/v1/search?q=%s&type=album&limit=%d";

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        List<SpotifyAlbumInformationDTO> albuns = new ArrayList<>();

        if (data instanceof List<?>) {
            List<Album> recommendedAlbums = (List<Album>) data;

            for (int i = 0; i < 5; i++) {
                String fullUrl = String.format(url, recommendedAlbums.get(i), 1);
                ResponseEntity<SpotifySearchResponseDTO> response = restTemplate.exchange(fullUrl,
                        HttpMethod.GET, entity,
                        SpotifySearchResponseDTO.class);
                System.out.println(response);

                SpotifySearchResponseDTO searchResponse = response.getBody();

                albuns.add(searchResponse.albumsWrapper().albums().get(0));
            }

        } else {
            String album = (String) data;
            String fullUrl = String.format(url, album, 10);
            ResponseEntity<SpotifySearchResponseDTO> response = restTemplate.exchange(fullUrl, HttpMethod.GET, entity,
                    SpotifySearchResponseDTO.class);
            System.out.println(response);

            SpotifySearchResponseDTO searchResponse = response.getBody();

            if (response.getBody() == null || searchResponse.albumsWrapper().albums() == null) {
                throw new RuntimeException();
            }

            albuns.addAll(searchResponse.albumsWrapper().albums());
        }

        return albuns;
    }
}
