// zelta-digital.com: sirve la página estática y manda www y http al dominio canónico con 301
// (lo que hacía vercel.json). /privacidad y /terminos salen solos de privacidad.html y terminos.html.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (env.CANONICO && (url.hostname !== env.CANONICO || url.protocol === "http:"))
      return Response.redirect(`https://${env.CANONICO}${url.pathname}${url.search}`, 301);
    return env.ASSETS.fetch(request);
  },
};
