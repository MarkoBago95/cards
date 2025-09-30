package com.example.cards.dto;

import lombok.*;

@Getter @Setter @AllArgsConstructor @NoArgsConstructor @Builder
public class ClientResponse {
  private String firstName;
  private String lastName;
  private String oib;
  private String status;
}
