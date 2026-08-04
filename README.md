# Akord — kalkulator tapicerski

Aplikacja do liczenia akordu w tapicerni. Wbudowany cennik: 160 mebli, 4126 bryl (stan 04.08.2026).
Dziennik zarobkow z datami i sumami za dowolny okres. Edytor cennika w aplikacji.

Dziala w calosci w przegladarce — dane leza w pamieci telefonu, nic nie wychodzi
na serwer. Po pierwszym otwarciu dziala bez zasiegu.

## Instalacja na telefonie

Otworz adres w Chrome i wybierz **Zainstaluj aplikacje** (albo menu `⋮` →
**Dodaj do ekranu glownego**). Na iPhonie: **Udostepnij** → **Do ekranu poczatkowego**.

## Pliki

| plik | rola |
|---|---|
| `index.html` | cala aplikacja z cennikiem w srodku |
| `manifest.json` | nazwa, ikony, tryb pelnoekranowy |
| `sw.js` | service worker: offline i przycisk instalacji |
| `icon-192.png`, `icon-512.png` | ikony na ekran glowny |
| `icon-maskable-512.png` | ikona maskable (Android obcina ja do kola) |

## Aktualizacja cennika

1. w `index.html` podmien JSON w `<script id="dane">`
2. ustaw `CENNIK_DATA` na date nowego cennika
3. podbij `CACHE` w `sw.js`

Zapisany na telefonie wlasny cennik nosi date bazy, na ktorej powstal. Gdy
`CENNIK_DATA` sie zmieni, aplikacja przechodzi na nowy cennik wbudowany, a
poprzednia wersje odklada pod klucz `akord.cennik.odlozony` i proponuje jej
zapis. Dziennik zarobkow nie jest przy tym ruszany.

Nowy `index.html` wchodzi sam po ponownym otwarciu aplikacji — nawigacja
pyta najpierw siec, a kopii z cache uzywa tylko bez zasiegu. `WERSJA`
w `_buduj_pwa.py` podbijaj przy zmianie ikon albo manifestu, albo zeby
wymusic zupelnie czysty cache.
