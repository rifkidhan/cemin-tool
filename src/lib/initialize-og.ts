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

export async function fonts() {
	const boldUrl = new URL(
		"https://github.com/tokotype/PlusJakartaSans/raw/refs/heads/master/fonts/ttf/PlusJakartaSans-Bold.ttf",
	);
	const regularUrl = new URL(
		"https://github.com/tokotype/PlusJakartaSans/raw/refs/heads/master/fonts/ttf/PlusJakartaSans-Regular.ttf",
	);

	if (typeof caches === "undefined") {
		const boldResponse = fetch(boldUrl);
		const regularResponse = fetch(regularUrl);

		const [bold, regular] = await Promise.all([
			boldResponse.then((res) => res.arrayBuffer()),
			regularResponse.then((res) => res.arrayBuffer()),
		]);

		return {
			bold,
			regular,
		};
	}

	const cache = await caches.open("fonts");
	const boldCache = await cache.match(boldUrl);
	const regularCache = await cache.match(regularUrl);

	if (boldCache && regularCache) {
		const [bold, regular] = await Promise.all([
			boldCache.arrayBuffer(),
			regularCache.arrayBuffer(),
		]);

		return {
			bold,
			regular,
		};
	}
	const boldResponse = fetch(boldUrl);
	const regularResponse = fetch(regularUrl);

	const [bold, regular] = await Promise.all([
		boldResponse,
		regularResponse,
	]);

	await cache.put(boldUrl, bold);
	await cache.put(regularUrl, regular);

	return {
		bold: await bold.arrayBuffer(),
		regular: await regular.arrayBuffer(),
	};
}
