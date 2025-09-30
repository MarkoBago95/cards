package com.example.cards.messaging;

import com.example.cards.dto.KafkaStatusMessage;
import com.example.cards.service.ClientService;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.common.errors.SerializationException;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

@Component @RequiredArgsConstructor
public class CardStatusListener {

  private final ClientService clientService;

  @KafkaListener(topics = "card-status-updates", groupId = "cards-service")
  public void onMessage(@Payload KafkaStatusMessage msg) {
    if (msg == null || msg.getOib() == null) {
      throw new SerializationException("Invalid message");
    }
    clientService.updateStatus(msg.getOib(), msg.getStatus());
  }
}
