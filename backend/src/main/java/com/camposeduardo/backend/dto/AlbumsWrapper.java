package com.camposeduardo.backend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record AlbumsWrapper(@JsonProperty("items") List<SpotifyAlbumInformationDTO> albums) {
}
