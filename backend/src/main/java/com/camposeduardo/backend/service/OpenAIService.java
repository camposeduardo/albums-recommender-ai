package com.camposeduardo.backend.service;

import com.camposeduardo.backend.domain.Album;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Stream;

@Service
public class OpenAIService {

    private final ChatClient chatClient;

    public OpenAIService(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    public List<Album> recommender(String album, String artist){
        String systemPrompt = getPrompt("src/main/resources/prompt.txt");
        String albumAndArtist = album + "," + artist;
        var system = new SystemMessage(systemPrompt);
        var user = new UserMessage(albumAndArtist);
        Prompt prompt = new Prompt(List.of(system, user));
        return convertJsonToList(chatClient.prompt(prompt).call().content());
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
        System.out.println(json);
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
