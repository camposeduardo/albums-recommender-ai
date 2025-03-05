package com.camposeduardo.backend.controller;


import com.camposeduardo.backend.domain.Album;
import com.camposeduardo.backend.service.OpenAIService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/album-recommender/api/v1")
@RequiredArgsConstructor
public class AlbumRecommenderController {

    private final OpenAIService openAiService;

    @GetMapping("/recommender")
    public ResponseEntity<List<Album>> generateAlbumRecommendation(@RequestParam String album,
                                                                   @RequestParam String artist
                                                                   ) {
        return ResponseEntity.ok().body(openAiService.recommender(album, artist));
    }
}
