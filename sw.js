/* Service worker — daje offline i przycisk „Zainstaluj”.
   Nawigacja: najpierw sieć, żeby po wgraniu nowej wersji od razu ją widzieć;
   gdy sieci nie ma — z kopii. Reszta: najpierw kopia, odświeżana w tle. */
const CACHE = "akord-v6";
const PLIKI = ["./", "./index.html", "./manifest.json",
               "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE)
    .then((c) => c.addAll(PLIKI))
    .then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys()
    .then((k) => Promise.all(k.filter((x) => x !== CACHE).map((x) => caches.delete(x))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  if (req.mode === "navigate"){
    e.respondWith(
      fetch(req)
        .then((r) => { const k = r.clone();
          caches.open(CACHE).then((c) => c.put("./index.html", k)).catch(() => {});
          return r; })
        .catch(() => caches.match("./index.html").then((r) => r || caches.match("./")))
    );
    return;
  }

  e.respondWith(
    caches.match(req).then((kopia) => {
      const zsieci = fetch(req).then((r) => { const k = r.clone();
        caches.open(CACHE).then((c) => c.put(req, k)).catch(() => {});
        return r; });
      /* Przy trafieniu w kopie odswiezenie leci w tle — bez tego catch offline
         sypie nieobsluzonym odrzuceniem w konsoli service workera. */
      if (kopia){ zsieci.catch(() => {}); return kopia; }
      return zsieci;
    })
  );
});
