export default {
  async fetch(request) {
    const target = "https://www.themajikhouse.com";

    const url = new URL(request.url);
    const proxyUrl = target + url.pathname + url.search;

    const response = await fetch(proxyUrl, {
      method: request.method,
      headers: request.headers,
      redirect: "follow"
    });

    const headers = new Headers(response.headers);

    headers.delete("x-frame-options");
    headers.delete("content-security-policy");

    return new Response(response.body, {
      status: response.status,
      headers
    });
  }
};
