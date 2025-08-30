import { initWasm } from "https://esm.sh/@resvg/resvg-wasm";

export async function initialize() {
	const resvgWasm = new URL("https://unpkg.com/@resvg/resvg-wasm/index_bg.wasm");

	if (typeof caches === "undefined") {
		const resvgResponse = await fetch(resvgWasm);
		initWasm(await resvgResponse.arrayBuffer());

		return;
	}

	const cache = await caches.open("wasm");
	const resvgCached = await cache.match(resvgWasm);

	if (resvgCached) {
		initWasm(await resvgCached.arrayBuffer());
		return;
	}

	const resvgResponse = await fetch(resvgWasm);
	await cache.put(resvgWasm, resvgResponse.clone());
	await initWasm(await resvgResponse.arrayBuffer());
}
