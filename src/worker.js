// zelta-digital.com: sirve la página estática y manda www y http al dominio canónico con 301
// (lo que hacía vercel.json). /privacidad y /terminos salen solos de privacidad.html y terminos.html.
// /clientes/* → panel de clientes (service binding PANEL).
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (env.CANONICO && (url.hostname !== env.CANONICO || url.protocol === "http:"))
      return Response.redirect(`https://${env.CANONICO}${url.pathname}${url.search}`, 301);
    // Panel de clientes: vive en otro Worker (repo privado); acá solo se le pasa el pedido.
    if (url.pathname === "/clientes" || url.pathname.startsWith("/clientes/")) return env.PANEL.fetch(request);
    return env.ASSETS.fetch(request);
  },
};
