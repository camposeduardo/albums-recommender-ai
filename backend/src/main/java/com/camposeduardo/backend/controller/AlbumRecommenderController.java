package com.camposeduardo.backend.controller;


import com.camposeduardo.backend.dto.SpotifyAlbumInformationDTO;
import com.camposeduardo.backend.dto.SpotifyAlbumsDTO;
import com.camposeduardo.backend.service.OpenAIService;
import com.camposeduardo.backend.service.SpotifyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/album-recommender/api/v1")
@RequiredArgsConstructor
public class AlbumRecommenderController {

    private final SpotifyService spotifyService;
    private final OpenAIService openAiService;

    @GetMapping("/recommender")
    public ResponseEntity<List<SpotifyAlbumInformationDTO>> getAlbumRecommendation(
            // later change to SpotifyAlbumInformation
            @RequestParam String album,
            @RequestParam String artist,
            @RequestHeader("authorization") String spotifyToken
                                                                   ) {
        return ResponseEntity.ok().body(openAiService.generateAlbumRecommendations(album, artist, spotifyToken));
    }

    @PutMapping("/save/albums")
    public ResponseEntity<String> saveAlbums(
            @RequestBody SpotifyAlbumsDTO spotifyAlbums,
            @RequestHeader("authorization") String spotifyToken
    ) {
        return ResponseEntity.ok().body(spotifyService.saveSpotifyAlbums(spotifyAlbums, spotifyToken));
    }
}
