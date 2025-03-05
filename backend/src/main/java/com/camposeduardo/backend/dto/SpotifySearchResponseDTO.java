package com.camposeduardo.backend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public record SpotifySearchResponseDTO(@JsonProperty("albums") AlbumsWrapper albumsWrapper) {
}
