package com.example.cards.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "clients", indexes = {
    @Index(name = "ux_clients_oib", columnList = "oib", unique = true)
})
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Client {

  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String firstName;

  @Column(nullable = false)
  private String lastName;

  @Column(nullable = false, unique = true, length = 11)
  private String oib;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private CardStatus status;
}
