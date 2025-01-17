import { Hono } from "@hono/hono";
import { serveStatic } from "@hono/hono/deno";
import { etag } from "@hono/hono/etag";
import og from "~/og.tsx";
import geo from "~/geo.ts";
import image from "~/image.ts";
import { initializeImageMagick } from "~/lib/image.ts";

const app = new Hono();

await initializeImageMagick();
app.use("*", etag());
app.use("/favicon.ico", serveStatic({ path: "./favicon.ico" }));
app.get("/", (c) => {
	return c.text("Cemin Tools");
});

app.route("/og", og);
app.route("/geo", geo);
app.route("/image", image);

Deno.serve(app.fetch);
