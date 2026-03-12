const CACHE_NAME = 'mercadopago-v1';
const urlsToCache = [
  '/mercadopago.html',
  '/mercadopago.css',
  '/mercadopago.js',
  '/logomp.png',
  '/casinha.png',
  '/catao.png',
  '/pix2.png',
  '/pagamento.png',
  '/mais.png',
  '/images.png',
  '/cartao.jpeg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
