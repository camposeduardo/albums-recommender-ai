package com.camposeduardo.backend.controller;


import com.camposeduardo.backend.dto.SpotifyAlbumInformationDTO;
import com.camposeduardo.backend.service.OpenAIService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/album-recommender/api/v1")
@RequiredArgsConstructor
public class AlbumRecommenderController {

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
}
