import React from "https://esm.sh/react@18.2.0";
import { ImageResponse } from "https://deno.land/x/og_edge@0.0.6/mod.ts";
import { Hono } from "@hono/hono";

const og = new Hono();

const boldFont = fetch(
	"https://github.com/tokotype/PlusJakartaSans/raw/refs/heads/master/fonts/ttf/PlusJakartaSans-Bold.ttf",
).then((res) => res.arrayBuffer());

const regularFont = fetch(
	"https://github.com/tokotype/PlusJakartaSans/raw/refs/heads/master/fonts/ttf/PlusJakartaSans-Regular.ttf",
).then((res) => res.arrayBuffer());

og.get("/", async (c) => {
	const { title, content, color } = c.req.query();

	let titleTemplate = "Rifkidhan";

	if (title) {
		titleTemplate = title;
	}

	const [regular, bold] = await Promise.all([regularFont, boldFont]);

	const colorPallete = (color?: string) => {
		switch (color) {
			case "pink":
				return "#f531b3";
			case "blue":
				return "#18A0FB";
			case "yellow":
				return "#FFEB00";
			case "red":
				return "#F24822";
			case "purple":
				return "#7B61FF";
			default:
				return "#f531b3";
		}
	};

	return new ImageResponse(
		(
			<div
				style={{
					display: "flex",
					position: "relative",
					flexDirection: "column",
					height: "100%",
					width: "100%",
					alignItems: "center",
					justifyContent: "center",
					fontWeight: 400,
					border: "black solid 4px",
					backgroundColor: "#fff",
					fontFamily: "Plus Jakarta Sans",
				}}
			>
				<div
					style={{
						display: "flex",
						position: "relative",
						flexDirection: "column",
						padding: "5%",
						width: "85%",
						height: "85%",
						borderRadius: "20px",
						border: "black solid 4px",
						justifyContent: "center",
						boxShadow: "5px 10px #000",
						backgroundColor: colorPallete(color),
					}}
				>
					<div
						style={{
							fontSize: "64px",
							fontWeight: 700,
						}}
					>
						{titleTemplate}
					</div>
					{content && (
						<div style={{ margin: "10px 0", fontSize: "48px" }}>
							{content}
						</div>
					)}
				</div>
				<svg
					width="90"
					height="120"
					viewBox="0 0 90 120"
					fill={colorPallete(color)}
					stroke="black"
					strokeWidth="4px"
					xmlns="http://www.w3.org/2000/svg"
					style={{
						position: "absolute",
						left: "4%",
						top: "20%",
					}}
				>
					<path d="M2 4.82843L57.1716 60L1.99999 115.172L2 4.82843Z" />
					<path d="M32 4.82843L87.1716 60L32 115.172L32 4.82843Z" />
				</svg>
				<svg
					width="124"
					height="60"
					viewBox="0 0 124 60"
					fill="none"
					stroke="black"
					strokeWidth="4"
					strokeLinecap="round"
					xmlns="http://www.w3.org/2000/svg"
					style={{
						position: "absolute",
						right: "4%",
						top: "20%",
					}}
				>
					<path d="M2 6C8.66667 0.666667 15.3333 0.666667 22 6C28.6667 11.3333 35.3333 11.3333 42 6C48.6667 0.666667 55.3333 0.666667 62 6C68.6667 11.3333 75.3333 11.3333 82 6C88.6667 0.666667 95.3333 0.666667 102 6C108.667 11.3333 115.333 11.3333 122 6" />
					<path d="M2 30C8.66667 24.6667 15.3333 24.6667 22 30C28.6667 35.3333 35.3333 35.3333 42 30C48.6667 24.6667 55.3333 24.6667 62 30C68.6667 35.3333 75.3333 35.3333 82 30C88.6667 24.6667 95.3333 24.6667 102 30C108.667 35.3333 115.333 35.3333 122 30" />
					<path d="M2 54C8.66667 48.6667 15.3333 48.6667 22 54C28.6667 59.3333 35.3333 59.3333 42 54C48.6667 48.6667 55.3333 48.6667 62 54C68.6667 59.3333 75.3333 59.3333 82 54C88.6667 48.6667 95.3333 48.6667 102 54C108.667 59.3333 115.333 59.3333 122 54" />
				</svg>
				<svg
					width="120"
					height="120"
					viewBox="0 0 120 120"
					fill="none"
					stroke="black"
					strokeWidth="4"
					xmlns="http://www.w3.org/2000/svg"
					style={{
						position: "absolute",
						right: "12%",
						bottom: "12%",
					}}
				>
					<circle cx="60" cy="60" r="58" strokeDasharray="8 8" />
					<circle cx="60" cy="60" r="28" />
				</svg>
			</div>
		),
		{
			height: 630,
			width: 1200,
			fonts: [
				{
					name: "Plus Jakarta Sans",
					data: regular,
					style: "normal",
					weight: 400,
				},
				{
					name: "Plus Jakarta Sans",
					data: bold,
					style: "normal",
					weight: 700,
				},
			],
		},
	);
});

export default og;
