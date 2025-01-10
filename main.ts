import { Hono } from "@hono/hono";
import { serveStatic } from "@hono/hono/deno";
import og from "~/og.tsx";

const app = new Hono();

app.use("/favicon.ico", serveStatic({ path: "./favicon.ico" }));

app.get("/", (c) => {
	return c.text("Cemin Tools");
});

app.route("/og", og);

Deno.serve(app.fetch);
