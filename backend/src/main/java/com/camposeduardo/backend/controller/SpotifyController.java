package com.camposeduardo.backend.controller;

import com.camposeduardo.backend.dto.AccessTokenDTO;
import com.camposeduardo.backend.dto.SpotifyAlbumInformationDTO;
import com.camposeduardo.backend.service.SpotifyLoginService;
import com.camposeduardo.backend.service.SpotifyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/album-recommender/api/v1")
public class SpotifyController {

    @Autowired
    private SpotifyLoginService loginService;

    @Autowired
    private SpotifyService spotifyService;

    @GetMapping("/auth/spotify-url")
    public ResponseEntity<Map<String, String>> getSpotifyAuthUrl()  {
        return ResponseEntity.ok().body(loginService.createUserAuthURL());
    }

    @PostMapping("/token")
    public ResponseEntity<AccessTokenDTO> getAccessToken(@RequestParam String code,
                                                @RequestParam String verifier)  {
        return ResponseEntity.ok().body(loginService.requestAccessToken(code, verifier));
    }

    @GetMapping("/search")
    public ResponseEntity<List<SpotifyAlbumInformationDTO>> search(@RequestHeader("Authorization") String token,
                                                                   @RequestParam String album)  {
        return ResponseEntity.ok().body(spotifyService.search(token, album));
    }
}
