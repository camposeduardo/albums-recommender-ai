package com.camposeduardo.backend.service;

import com.camposeduardo.backend.domain.Album;
import com.camposeduardo.backend.dto.SpotifyAlbumInformationDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@Service
public class OpenAIService {

    private final ChatClient chatClient;
    private final SpotifyService spotifyService;

    public OpenAIService(ChatClient.Builder builder, SpotifyService spotifyService) {
        this.spotifyService = spotifyService;
        this.chatClient = builder.build();
    }

    public List<SpotifyAlbumInformationDTO> generateAlbumRecommendations(String album,
                                                                         String artist,
                                                                         String token){
        String systemPrompt = getPrompt("src/main/resources/prompt.txt");
        String albumAndArtist = album + "," + artist;
        var system = new SystemMessage(systemPrompt);
        var user = new UserMessage(albumAndArtist);
        Prompt prompt = new Prompt(List.of(system, user));
        List<Album> gptAlbumRecommendation = convertJsonToList(chatClient.prompt(prompt).call().content());

        return spotifyService.search(token, gptAlbumRecommendation);
    }

    public static String getPrompt(String filePath) {
        var filePath1 = Paths.get(filePath);
        String prompt = null;
        try {
            prompt = Files.readString(filePath1, StandardCharsets.UTF_8);

        } catch (IOException e) {
            throw new RuntimeException(e.getMessage());
        }
        return prompt;
    }

    public List<Album> convertJsonToList(String json)  {
        ObjectMapper objectMapper = new ObjectMapper();
        List<Album> albuns = null;

        try {
            albuns = objectMapper.readValue(json, new TypeReference<List<Album>>(){});
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        return albuns;
    }

}
