import { Hono } from "@hono/hono";
import { getConnInfo } from "@hono/hono/deno";

const app = new Hono();

const disIp = "180.252.175.72";

app.get("/", async (c) => {
	const connInfo = getConnInfo(c);

	const remoteAddress = connInfo.remote.address;

	const ip = typeof remoteAddress === "undefined" || remoteAddress === "127.0.0.1"
		? disIp
		: remoteAddress;

	const getGeoLocation = await fetch(`https://freegeoip.app/json/${ip}`).then((res) => res.json());

	return c.json(getGeoLocation, 200, {
		"Cache-Control": "public, max-age=600",
	});
});

export default app;
