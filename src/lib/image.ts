import {
	ImageMagick,
	initialize,
	MagickFormat,
	MagickGeometry,
} from "https://deno.land/x/imagemagick_deno@0.0.31/mod.ts";
import { extension, parseMediaType } from "jsr:@std/media-types";

export const initializeImageMagick = async () => {
	await initialize();
};

interface TransformOption {
	type?: "png" | "webp" | "avif";
	quality?: number;
	width?: number;
}

export const transform = (
	imageSource: Uint8Array,
	mediatype: string,
	{
		type,
		quality = 80,
		width,
	}: TransformOption,
) => {
	const sameExtension = type === extension(mediatype) ? true : false;

	return new Promise<Uint8Array>((resolve) => {
		ImageMagick.read(imageSource, (image) => {
			image.quality = quality;
			if (width) {
				const resize = new MagickGeometry(width);
				image.resize(resize);
			}

			if (!sameExtension) {
				if (type === "png") {
					image.format = MagickFormat.Png;
				}
				if (type === "webp") {
					image.format = MagickFormat.WebP;
				}

				if (type === "avif") {
					image.format = MagickFormat.Avif;
				}
			}

			image.write((data) => resolve(data));
		});
	});
};

export const getRemoteImage = async (url: string) => {
	try {
		const source = await fetch(url, { signal: AbortSignal.timeout(50000) });

		if (!source.ok) {
			throw Error("Fetch failed");
		}

		const mediaType = parseMediaType(source.headers.get("Content-Type")!)[0];
		if (mediaType.split("/")[0] !== "image") {
			throw Error("URL is not image");
		}

		return {
			buffer: new Uint8Array(await source.arrayBuffer()),
			mediaType,
		};
	} catch (e) {
		console.error(e);

		return undefined;
	}
};
