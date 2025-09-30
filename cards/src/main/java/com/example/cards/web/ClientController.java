package com.example.cards.web;

import com.example.cards.dto.*;
import com.example.cards.service.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/clients")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ClientController {

  private final ClientService clientService;
  private final ExternalApiService externalApiService;

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public ClientResponse create(@Valid @RequestBody ClientCreateRequest req) {
    return clientService.create(req);
  }

  @GetMapping("/{oib}")
  public ClientResponse get(@PathVariable String oib) {
    return clientService.getByOib(oib);
  }

  @DeleteMapping("/{oib}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable String oib) {
    clientService.deleteByOib(oib);
  }

  @PostMapping("/{oib}/forward")
  public ForwardResponse forward(@PathVariable String oib) {
    var c = clientService.getByOib(oib);
    return externalApiService.forward(c);
  }
}
