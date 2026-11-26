/* v2: zmiana nazwy kasuje przy aktualizacji stara pamiec v1, w ktorej
   kazde otwarcie aplikacji zostawialo osobna kopie cennika. */
const CACHE = "akord-v2";
const PLIKI = ["./", "./index.html", "./manifest.json", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png"];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PLIKI)).then(() => self.skipWaiting())); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then((k) => Promise.all(k.filter((x) => x !== CACHE).map((x) => caches.delete(x)))).then(() => self.clients.claim())); });
/* Service worker obsluguje tylko pliki aplikacji. Inne strony pod tym samym
   adresem (np. skaner-test/) ida zwyczajnie przez siec — inaczej kazda otwarta
   strona zapisywala sie jako kopia aplikacji na tryb bez zasiegu. */
const SWOJE = new Set(PLIKI.map((p) => new URL(p, self.registration.scope).pathname));
self.addEventListener("fetch", (e) => {
  const req=e.request;
  if(req.method!=="GET") return;
  const url = new URL(req.url);
  if(url.origin!==self.location.origin || !SWOJE.has(url.pathname)) return;
  if(req.mode==="navigate"){
    e.respondWith(fetch(req).then((r)=>{const k=r.clone();caches.open(CACHE).then((c)=>c.put("./index.html",k)).catch(()=>{});return r;}).catch(()=>caches.match("./index.html").then((r)=>r||caches.match("./"))));
    return;
  }
  e.respondWith(caches.match(req).then((cached)=>{
    const network=fetch(req).then((r)=>{const k=r.clone();caches.open(CACHE).then((c)=>c.put(req,k)).catch(()=>{});return r;});
    if(cached){network.catch(()=>{});return cached;}
    return network;
  }));
});
