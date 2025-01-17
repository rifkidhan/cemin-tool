import { Hono } from "@hono/hono";
import { getRemoteImage, transform } from "~/lib/image.ts";

const app = new Hono();

const isNumber = (input?: string) => {
	if (!input) return false;
	return /^\d+$/.test(input);
};

const isAllowedType = (input?: string) => {
	switch (input) {
		case "webp":
			return "webp";
		case "avif":
			return "avif";
		case "png":
			return "png";
		default:
			return undefined;
	}
};

app.get("/:url", async (c) => {
	const { url } = c.req.param();
	const { type, w, q } = c.req.query();

	const imageRes = await getRemoteImage(decodeURIComponent(url));

	if (imageRes) {
		const transformImage = await transform(imageRes.buffer, imageRes.mediaType, {
			width: isNumber(w) ? Number(w) : undefined,
			quality: isNumber(q) ? Number(q) : undefined,
			type: isAllowedType(type),
		});

		return c.body(transformImage, 200, {
			"Content-Type": type ? `image/${type}` : imageRes.mediaType,
		});
	}
});

export default app;
