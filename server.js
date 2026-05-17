const { Hono } = require('hono');
const { serve } = require('@hono/node-server'); // اصلاح شده
const { cors } = require('hono/cors');

const app = new Hono();

// CORS برای راحتی بیشتر
app.use('/*', cors());

// صفحه اصلی
app.get('/', async (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="fa" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>XHTTP Relay - Coolify</title>
      <style>
        body { font-family: system-ui; text-align: center; padding: 50px; background: #0f172a; color: #e2e8f0; }
        h1 { color: #22d3ee; }
      </style>
    </head>
    <body>
      <h1>✅ XHTTP Relay فعال است</h1>
      <p>این سرور روی Coolify در حال اجراست</p>
      <p>هدر <code>x-host</code> را ارسال کنید</p>
    </body>
    </html>
  `);
});

const STRIP_HEADERS = new Set([
  "host", "connection", "keep-alive", "proxy-authenticate",
  "proxy-authorization", "te", "trailer", "transfer-encoding",
  "upgrade", "forwarded", "x-forwarded-host", "x-forwarded-proto",
  "x-forwarded-port", "x-real-ip"
]);

app.all('/*', async (c) => {
  try {
    const targetHost = c.req.header('x-host');

    if (!targetHost) {
      return c.text("Error: x-host header is missing.", 400);
    }

    const url = new URL(c.req.url);
    let targetUrl;

    if (targetHost.startsWith('http://') || targetHost.startsWith('https://')) {
      targetUrl = `${targetHost}${url.pathname}${url.search}`;
    } else {
      const isSecure = !targetHost.includes(':') || targetHost.includes(':443') || /^s\d+\./.test(targetHost);
      const protocol = isSecure ? 'https://' : 'http://';
      targetUrl = `${protocol}${targetHost}${url.pathname}${url.search}`;
    }

    const headers = new Headers();
    let clientIp = c.req.header('x-real-ip') || c.req.header('x-forwarded-for');

    for (const [key, value] of c.req.raw.headers) {
      const k = key.toLowerCase();
      if (STRIP_HEADERS.has(k) || k.startsWith("x-nf-") || k.startsWith("x-netlify-") || k === "x-host") {
        continue;
      }
      headers.set(key, value);
    }

    if (clientIp) headers.set("x-forwarded-for", clientIp);

    const fetchOptions = {
      method: c.req.method,
      headers,
      body: ['GET', 'HEAD'].includes(c.req.method) ? undefined : c.req.raw.body,
      redirect: 'manual'
    };

    const upstream = await fetch(targetUrl, fetchOptions);

    const responseHeaders = new Headers();
    for (const [key, value] of upstream.headers) {
      if (key.toLowerCase() === "transfer-encoding") continue;
      responseHeaders.set(key, value);
    }

    return new Response(upstream.body, {
      status: upstream.status,
      headers: responseHeaders
    });

  } catch (error) {
    console.error(error);
    return c.text("Bad Gateway: Relay Failed", 502);
  }
});

const port = process.env.PORT || 3000;
serve({
  fetch: app.fetch,
  port: port
}, (info) => {
  console.log(`🚀 XHTTP Relay running on http://0.0.0.0:${info.port}`);
});