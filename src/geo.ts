import { Hono } from "@hono/hono";
import { getConnInfo } from "@hono/hono/deno";

const app = new Hono();

app.get("/", async (c) => {
	const connInfo = getConnInfo(c);

	const remoteAddress = connInfo.remote.address;

	const getGeoLocation = await fetch(`https://freegeoip.app/json/${remoteAddress}`).then((res) =>
		res.json()
	);

	return c.json(getGeoLocation);
});

export default app;
