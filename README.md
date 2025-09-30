# Kreditne kartice – mini aplikacija  
Spring Boot (Java 17) • PostgreSQL • Angular (PrimeNG) • React (PrimeReact) • Docker

## 🗺️ Što je ovo
Aplikacija za evidentiranje klijenata koji traže kreditnu karticu i prosljeđivanje podataka na vanjski API (prema OpenAPI YAML-u).

- **Backend:** Spring Boot 3 (REST, JPA, Validation, WebClient)  
- **Baza:** PostgreSQL (Docker), pgAdmin  
- **Frontend 1:** Angular 16 + PrimeNG  
- **Frontend 2:** React + PrimeReact (radi paralelno s Angularom)  
- **Bonus:** Kafka listener za ažuriranje statusa (opcionalno)

---

## 🔭 Lokalni linkovi
- **Backend API:** <http://localhost:8080>  
  - Health: <http://localhost:8080/actuator/health>
- **Angular UI:** <http://localhost:4200>  
- **React UI:** <http://localhost:5173> *(Docker; u dev modu Vite može dati drugi port)*  
- **pgAdmin:** <http://localhost:5050>  (login: `admin@local` / `admin`)  
  - Server: **postgres** (unutar Dockera) ili **localhost:5433** s hosta, user/pass: `cards/cards`

---

## ⤵️ Preuzimanje repozitorija
git clone https://github.com/MarkoBago95/cards.git
cd cards
````

---

## 🟢 Pokretanje s Dockerom (preporučeno)

Preduvjet: Docker Desktop.

```bash
docker compose down -v          # opcionalno: čisto od nule
docker compose up -d --build
docker compose ps
```

**Servisi / portovi**

* PostgreSQL: `localhost:5433` (db/user/pass: `cards/cards`)
* Backend: [http://localhost:8080](http://localhost:8080)
* Angular: [http://localhost:4200](http://localhost:4200)
* React (Docker): [http://localhost:5173](http://localhost:5173)
* pgAdmin: [http://localhost:5050](http://localhost:5050)

> DBeaver: host `localhost`, port `5433`, db `cards`, user/pass `cards/cards`.

---

## 🖥️ Pokretanje bez Dockera (dev)

### Backend (Spring Boot)

`backend/src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5433/cards
    username: cards
    password: cards
```

Pokreni:

```bash
cd backend
./gradlew bootRun      # Windows: .\gradlew.bat bootRun
```

### Angular dev

```bash
cd frontend
npm install
npm start              # http://localhost:4200
```

### React dev

```bash
cd frontend-react
npm install
npm run dev            # Vite će ispisati URL (tipično http://localhost:5173)
```

---

## 🧫 Testiranje (E2E cURL)

**1) Unos klijenta (POST)**

```bash
curl -X POST http://localhost:8080/api/clients \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Ana","lastName":"Anić","oib":"12345678901","status":"PENDING"}'
```

**2) Dohvat po OIB-u (GET)**

```bash
curl http://localhost:8080/api/clients/12345678901
```

**3) Prosljeđivanje na vanjski API (FORWARD)**

```bash
curl -X POST http://localhost:8080/api/clients/12345678901/forward
```

Backend šalje prema YAML-u:

```
POST https://api.something.com/v1/api/v1/card-request
Body: {"firstName","lastName","status","oib"}
```

> Bez stvarnog vanjskog API-ja koristi **mock** (npr. WireMock) i postavi `app.external.base-url` na mock.

**4) Brisanje (DELETE)**

```bash
curl -X DELETE http://localhost:8080/api/clients/12345678901 -i
```

---

## 🛠️ Konfiguracija (sažetak)

**Backend – `application.yml`:**

```yaml
spring:
  datasource:
    url: jdbc:postgresql://postgres:5432/cards   # iz Dockera
    username: cards
    password: cards
  jpa:
    hibernate:
      ddl-auto: update
    properties:
      hibernate.format_sql: true

app:
  external:
    base-url: https://api.something.com/v1
    card-request-path: /api/v1/card-request
```

> Ako backend vrtiš izvan Dockera: `jdbc:postgresql://localhost:5433/cards`.

**Kafka (opcionalno)**

* Topic: `card-status-updates` (npr. i `card-status-updates-v2`)
* Poruka: `{"oib":"12345678901","status":"APPROVED"}`
* Listener ažurira `status` u bazi.

---

## 🗃️ Struktura repozitorija

```
backend/           # Spring Boot (Java 17)
frontend/          # Angular 16 + PrimeNG
frontend-react/    # React + PrimeReact
docker-compose.yml
```

---

## 🧰 Postman – body primjeri

**POST /api/clients**

```json
{ "firstName": "Ana", "lastName": "Anić", "oib": "12345678901", "status": "PENDING" }
```

**Drugi:**

```json
{ "firstName": "Marko", "lastName": "Marić", "oib": "23456789012", "status": "APPROVED" }
```

> `GET /api/clients/{oib}` nema body.

---

## 🧯 Troubleshooting (kratko)

* **“Bijela stranica” frontend** – provjeri `<base href="/">`, da je ispravan `dist` path u Dockerfile-u, te da su Prime stilovi uključeni.
* **Forward vraća 500** – vanjski API nije konfiguriran/dostupan; koristi mock ili mapiraj greške na 502 s porukom.
* **DB s hosta ne radi** – koristi port `5433`.

---

## 📋 Zahtjevi ✅

* ✔ Unos klijenta → `POST /api/clients`
* ✔ Pretraga po OIB-u → `GET /api/clients/{oib}`
* ✔ Prosljeđivanje na API (YAML) → `POST /api/clients/{oib}/forward`
* ✔ Brisanje → `DELETE /api/clients/{oib}`
* ✔ RESTful metode → Spring REST
* ✔ Persistencija → PostgreSQL (JPA/Hibernate)
* ◻ Bonus I (Kafka) → listener uključen (pokrenuti Kafka servis po potrebi)
* ✔ Bonus II (UI) → Angular i React forme
