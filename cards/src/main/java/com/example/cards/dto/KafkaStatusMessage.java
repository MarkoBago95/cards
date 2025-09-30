package com.example.cards.dto;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class KafkaStatusMessage {
  private String oib;
  private String status; // PENDING/APPROVED/REJECTED
}
