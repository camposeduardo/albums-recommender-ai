package com.camposeduardo.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class SpotifyAlbumInformationDTO {

    private String id;
    private String name;
    @JsonProperty("images")
    private List<ImageDTO> imageDTO;
}
