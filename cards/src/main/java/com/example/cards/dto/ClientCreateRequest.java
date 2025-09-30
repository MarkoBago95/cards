package com.example.cards.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ClientCreateRequest {
  @NotBlank private String firstName;
  @NotBlank private String lastName;

  @Pattern(regexp = "\\d{11}", message = "OIB mora imati točno 11 znamenki")
  private String oib;

  @NotBlank private String status; // PENDING/APPROVED/REJECTED
}
