package com.example.cards.service;

import com.example.cards.dto.ClientResponse;
import com.example.cards.dto.ForwardResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service @RequiredArgsConstructor
public class ExternalApiService {
  private final WebClient webClient;

  @Value("${app.external.card-request-path}")
  private String cardRequestPath;

  public ForwardResponse forward(ClientResponse c) {
    var body = Map.of(
        "firstName", c.getFirstName(),
        "lastName",  c.getLastName(),
        "status",    c.getStatus(),
        "oib",       c.getOib()
    );

    webClient.post()
        .uri(cardRequestPath)
        .contentType(MediaType.APPLICATION_JSON)
        .accept(MediaType.ALL)
        .bodyValue(body)
        .retrieve()
        .toBodilessEntity()
        .block();

    return new ForwardResponse("Forwarded to external API");
  }
}
