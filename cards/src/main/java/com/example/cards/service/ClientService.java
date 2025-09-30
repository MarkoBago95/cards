package com.example.cards.service;

import com.example.cards.domain.*;
import com.example.cards.dto.*;
import com.example.cards.repo.ClientRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service @RequiredArgsConstructor
public class ClientService {
  private final ClientRepository repo;

  @Transactional
  public ClientResponse create(ClientCreateRequest req) {
    if (repo.existsByOib(req.getOib())) {
      throw new IllegalArgumentException("Klijent s danim OIB-om već postoji");
    }
    var status = CardStatus.valueOf(req.getStatus().toUpperCase());
    var saved = repo.save(Client.builder()
        .firstName(req.getFirstName())
        .lastName(req.getLastName())
        .oib(req.getOib())
        .status(status)
        .build());
    return toDto(saved);
  }

  @Transactional(readOnly = true)
  public ClientResponse getByOib(String oib) {
    var c = repo.findByOib(oib).orElseThrow(() -> new EntityNotFoundException("Nema klijenta"));
    return toDto(c);
  }

  @Transactional
  public void deleteByOib(String oib) {
    var c = repo.findByOib(oib).orElseThrow(() -> new EntityNotFoundException("Nema klijenta"));
    repo.delete(c);
  }

  @Transactional
  public void updateStatus(String oib, String statusStr) {
    var c = repo.findByOib(oib).orElseThrow(() -> new EntityNotFoundException("Nema klijenta"));
    c.setStatus(CardStatus.valueOf(statusStr.toUpperCase()));
  }

  private ClientResponse toDto(Client c) {
    return ClientResponse.builder()
        .firstName(c.getFirstName())
        .lastName(c.getLastName())
        .oib(c.getOib())
        .status(c.getStatus().name())
        .build();
  }
}
