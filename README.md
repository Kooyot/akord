# Akord — kalkulator tapicerski

Aplikacja do liczenia akordu w tapicerni. Wbudowany cennik: 150 mebli, 3810 bryl.
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

Nowy `index.html` wchodzi sam po ponownym otwarciu aplikacji — nawigacja
pyta najpierw siec, a kopii z cache uzywa tylko bez zasiegu. `WERSJA`
w `_buduj_pwa.py` podbijaj przy zmianie ikon albo manifestu, albo zeby
wymusic zupelnie czysty cache.
