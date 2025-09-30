package com.example.cards.repo;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.cards.domain.Client;

public interface ClientRepository extends JpaRepository<Client, Long> {
  Optional<Client> findByOib(String oib);
  void deleteByOib(String oib);
  boolean existsByOib(String oib);
}
